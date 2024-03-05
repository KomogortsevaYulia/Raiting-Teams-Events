import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { UsersService } from '../users/users.service';
import { SearchTeamDto } from './dto/search-team.dto';
import { Requisitions } from './entities/requisition.entity';
import { RequisitionDto } from './dto/uc-requisition.dto';
import { GeneralService } from '../general/general.service';
import { DictionaryDto } from 'src/general/dto/dictionary.dto';
import { CreateRequisitionFieldDto } from './dto/create-requisition-field.dto';
import { RequisitionFields } from 'src/forms/entities/requisition_fields.entity';
import { CreateRequisitionDto } from './dto/create-requisition.dto';
import { FormsService } from 'src/forms/forms.service';
import { AssignDirectionTeamLeaderDto } from '../users/dto/direction-leader.dto';
import { Permissions } from '../shared/permissions';
import { CreateFunctionDto } from '../users/dto/create-functions.dto';
import { CreateUserFunctionDto } from '../users/dto/create-user-function.dto';
import { PermissionsRoles, Roles } from '../shared/permissionsRoles';
import { TeamRoles } from '../shared/teamRoles';
import { PermissionsActions } from '../general/enums/action-permissions';
import { TeamFunction } from '../users/entities/function.entity';
import { UserFunctionDto } from '../users/dto/user-functions.dto';
import { FindRequisitionDto } from '../forms/dto/find-requisition.dto';
import { CreateFormDto } from '../forms/dto/create-form.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) // user //,
    private readonly teamsRepository: Repository<Team>,
    @InjectRepository(UserFunction)
    private readonly userFunctionsRepository: Repository<UserFunction>,
    @InjectRepository(TeamFunction)
    private readonly functionsRepository: Repository<TeamFunction>,
    @InjectRepository(Requisitions)
    private readonly requisitionsRepository: Repository<Requisitions>,
    @InjectRepository(RequisitionFields)
    private readonly requisitionsFieldsRepository: Repository<RequisitionFields>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly dictionaryService: GeneralService,
    private readonly formService: FormsService,
  ) {}

  async findOne(id: number) {
    const head = TeamRoles.Leader;

    const res = await this.teamsRepository
      .createQueryBuilder('teams')

      .select([
        'teams.id',
        'teams.title',
        'teams.tags',
        'teams.image',
        'teams.phone',
        'teams.links',
        'teams.description',
        'teams.short_description',
        'teams.type_team',
        'teams.cabinets',
        'teams.is_archive',
        'teams.document',
        'teams.shortname',
        'teams.charter_team',
        'teams.id_parent',
        //     team photos
        'team_photos.image',
        'team_photos.id',
      ])
      .where('teams.id = :id', { id: id })
      // .andWhere('teams.type_team = :type', { type: 'teams' })
      // select direction
      .leftJoin('teams.id_parent', 'direction')
      .addSelect('direction.id')
      .leftJoin('teams.team_photos', 'team_photos')
      .leftJoinAndSelect(
        'teams.functions',
        'functions',
        'functions.title = :head',
        { head: head },
      )
      .leftJoin('functions.userFunctions', 'user_functions')
      .addSelect('user_functions.id')
      .leftJoinAndSelect('user_functions.user', 'user')
      .getOne();

    return res;
  }

  // Обновить коллектив
  async update(user: User, id: number, updateTeamDto: UpdateTeamDto) {
    updateTeamDto.id_parent = updateTeamDto.id_parent ?? null;
    const updatedTeam = await this.teamsRepository.save({
      id,
      ...updateTeamDto,
      cabinets: updateTeamDto.cabinetsAsNumbers,
      charter_team: updateTeamDto.charterTeam,
    });

    await this.findOne(id);

    if (updateTeamDto.leaders && updateTeamDto.leaders.length > 0) {
      const directionTeamLeaderDto = new AssignDirectionTeamLeaderDto();
      directionTeamLeaderDto.teamId = updatedTeam.id;
      directionTeamLeaderDto.userIds = updateTeamDto.leaders ?? [];
      directionTeamLeaderDto.roleName = TeamRoles.Leader;
      // назначить нового пользвоателя
      await this.assignTeamRole(user, directionTeamLeaderDto);
    }

    return updatedTeam;
  }

  //создать коллектив, с учетом, что есь минимум 1 лидер
  async create(user: User, createTeamDto: CreateTeamDto): Promise<Team> {
    const team = await this.teamsRepository.save({
      ...createTeamDto,
      cabinets: createTeamDto.cabinetsAsNumbers,
      charter_team: createTeamDto.charterTeam,
      image: [],
      tags: [],
      type_team: 'teams',
      creation_date: new Date(),
    });

    const directionTeamLeaderDto = new AssignDirectionTeamLeaderDto();
    directionTeamLeaderDto.teamId = team.id;
    directionTeamLeaderDto.userIds = createTeamDto.leaders ?? [];
    directionTeamLeaderDto.roleName = TeamRoles.Leader;

    // назначить нового пользвоателя
    await this.assignTeamRole(user, directionTeamLeaderDto);

    // create form for team
    const fDto = new CreateFormDto();
    fDto.team_id = team.id;
    await this.formService.createForm(fDto);

    return team;
  }

  // get all teams with leadeaders
  async findAll(params: SearchTeamDto): Promise<[Team[], number]> {
    let query = this.teamsRepository
      .createQueryBuilder('teams')

      .select([
        'teams.id',
        'teams.title',
        'teams.tags',
        'teams.image',
        'teams.description',
        'teams.short_description',
        'teams.type_team',
        'teams.cabinets',
        'teams.is_archive',
        'teams.document',
        'teams.shortname',
        'teams.charter_team',
        'teams.id_parent',
        'teams.set_open',
      ])
      .where('teams.type_team = :type', { type: params.type })
      // select direction
      .leftJoin('teams.id_parent', 'direction')
      // .andWhere("functions.title = :head", { head: head })

      .orderBy('teams.id', 'DESC');

    if (params.fields.includes('leaders')) {
      query
        .leftJoinAndSelect(
          'teams.functions',
          'functions',
          'functions.title = :head',
          { head: TeamRoles.Leader },
        )
        .leftJoinAndSelect('functions.userFunctions', 'user_functions')
        .leftJoin('user_functions.user', 'user')
        .addSelect([
          'user.id',
          'user.fullname',
          'user.email',
          'user.permissions',
        ]);
    }

    query = await this.filterTeam(params, query);
    query = query
      .take(params.limit) // Set the limit
      .skip(params.offset); // Set the offset

    return await query.getManyAndCount();
  }

  // отфильтровать колелктивы
  async filterTeam(params: SearchTeamDto, q: SelectQueryBuilder<Team>) {
    let query = q;

    //если у нас все параметры то через 'или' все ищем
    if (params.searchTxt) {
      //делаем все столбцы в нижнем регистре и ищем по всем столбцам через предлог "или"
      query = query.andWhere(
        `(LOWER(teams.title) like :title 
         or LOWER(teams.description) like :description 
         or LOWER(teams.tags) like :tags
         or LOWER(teams.shortname) like :shortname)`,
        {
          title: `%${params.searchTxt}%`,
          description: `%${params.searchTxt}%`,
          tags: `%${params.searchTxt}%`,
          shortname: `%${params.searchTxt}%`,
        },
      );
    } else {
      //если не все параметры, то ищем через 'и'

      //if title (если у нас есть тайтл то ищем по нему)
      params.title
        ? query.andWhere('LOWER(teams.title) like :title', {
            title: `%${params.title}%`,
          })
        : query;
      //if description
      params.description
        ? query.andWhere('LOWER(teams.description) like :description', {
            description: `%${params.description}%`,
          })
        : query;
      //if tags
      params.tags
        ? query.andWhere('LOWER(teams.tags) like :tags', {
            tags: `%${params.tags}%`,
          })
        : query;
    }

    //отфильтровать по направлению
    params.directions
      ? query.andWhere('teams.id_parent in (:...id_parents)', {
          id_parents: params.directions,
        })
      : query;

    if (params.is_archive != null) {
      //отфильтровать по типу коллектива
      query.andWhere('teams.is_archive = :is_archive', {
        is_archive: params.is_archive,
      });
    }

    // набор
    if (params.set_open != null) {
      query.andWhere('teams.set_open = :set_open', {
        set_open: params.set_open,
      });
    }

    return query;
  }

  // get all teams of specific direction for statistic
  async findAllTeamsOfDirection(id_parent = -1): Promise<[Team[], number]> {
    const type_team = 'teams';

    const teams = this.teamsRepository
      .createQueryBuilder('teams')

      .select([
        'teams.id',
        'teams.title',
        'teams.image',
        'teams.description',
        'teams.type_team',
        'teams.shortname',
      ])
      .where('teams.type_team = :type', { type: type_team });

    // с учетом направления
    if (id_parent > 0) {
      teams
        .andWhere('teams.id_parent = :id_parent ', { id_parent: id_parent })
        .leftJoin('teams.id_parent', 'id_parent')
        .addSelect(['id_parent.id', 'id_parent.shortname']);
    }

    return await teams.getManyAndCount();
  }

  async findDirections(id_parent = -1) {
    // const head = "Руководитель"

    const directionsAndUsers = this.teamsRepository
      .createQueryBuilder('teams')
      .select([
        'teams.shortname',
        'teams.type_team',
        'teams.id',
        'teams.title',
        'teams.short_description',
        'teams.description',
        'teams.cabinets',
      ])
      .andWhere('teams.type_team = :type', { type: 'direction' })
      .leftJoinAndSelect('teams.functions', 'functions')
      .addSelect(['functions.title'])
      .leftJoin('functions.userFunctions', 'user_functions')
      .addSelect('user_functions.id')
      .leftJoin('user_functions.user', 'user')
      .addSelect(['user.fullname', 'user.email', 'user.phone', 'user.image']);

    // с учетом направления
    if (id_parent > 0) {
      directionsAndUsers
        .andWhere('teams.id_parent = :id_parent ', { id_parent: id_parent })
        .leftJoin('teams.id_parent', 'id_parent')
        .addSelect(['id_parent.id', 'id_parent.shortname']);
    }

    return await directionsAndUsers.getManyAndCount();
  }

  //вывести команду
  async teamWithUsers(id: number, params: UserFunctionDto) {
    const query = this.userFunctionsRepository

      .createQueryBuilder('user_functions')
      .select([
        'user_functions.dateStart',
        'user_functions.dateEnd',
        'user_functions.dateCreate',
        'user_functions.dateUpdate',
      ])
      .leftJoinAndSelect('user_functions.user', 'user')
      .innerJoin('user_functions.function', 'function')
      .addSelect('function.title')
      .innerJoin('function.team', 'team')
      .limit(params.limit)
      .offset(params.offset)
      .where('team.id = :id', { id });

    // filters
    //date order by
    params.date_create_order
      ? query.orderBy('user_functions.dateCreate', params.date_create_order)
      : query;

    // fullname user
    params.searchTxt
      ? query.andWhere(`(LOWER(user.fullname) like :fullname)`, {
          fullname: `%${params.searchTxt}%`,
        })
      : query;

    return await query.getManyAndCount();
  }

  // ----------------------------------------------------------------------------
  // requisition ------------------------------------------------------------------
  // ----------------------------------------------------------------------------

  // обновить заявку пользователя на вступление
  async updateRequisition(id: number, updateRequisitionDto: RequisitionDto) {
    const dict_class_id = 6;

    let findDict = null;

    const dd = new DictionaryDto(
      updateRequisitionDto.status_name,
      dict_class_id,
    );

    // найти знаечние в словаре,чтобы ид получить
    if (updateRequisitionDto.status_name) {
      findDict = (await this.dictionaryService.findAll(dd))[0];
    }

    // принят на рассмотрение, приходите завтра в в-07
    const body = {
      id: id,
      ...updateRequisitionDto,
      date_update: new Date(),
    };

    if (findDict) body['status'] = findDict;

    // сохранить новые данные заявки
    return await this.requisitionsRepository.save(body);
  }

  async findAllRequisitions(
    team_id: number = null,
    reqDto: RequisitionDto,
  ): Promise<Requisitions[]> {
    let query = this.requisitionsRepository
      .createQueryBuilder('requisition')
      .select([
        'requisition.date_create',
        'requisition.date_update',
        'requisition.status',
        'requisition.id',
        'requisition.comment_leader',
      ])
      .leftJoinAndSelect('requisition.user', 'user')
      // взять статус со словаря
      .leftJoinAndSelect('requisition.status', 'status')

      .leftJoin('requisition.requisition_fields', 'rf')
      .leftJoin('rf.form_field', 'form_field')
      .leftJoin('form_field.form', 'form')
      .andWhere(
        new Brackets((sqb) => {
          sqb.where('form.team_id = :team_id', { team_id });
          sqb.orWhere('requisition.team_id = :team_id', { team_id });
        }),
      );

    query = await this.filterRequisition(reqDto, query);

    return await query.getMany();
  }

  async deleteRequisition(id: number) {
    return await this.requisitionsRepository.delete(id);
  }

  async filterRequisition(
    params: RequisitionDto,
    q: SelectQueryBuilder<Requisitions>,
  ) {
    const query = q;

    //statuses
    params.statuses.length > 0
      ? query.andWhere('status.name in (:...status)', {
          status: params.statuses,
        })
      : query;

    //date order by
    params.date_update_order
      ? query.orderBy('requisition.date_update', params.date_update_order)
      : query;

    // fullname user
    params.fullname
      ? query.andWhere(`(LOWER(user.fullname) like :fullname)`, {
          fullname: `%${params.fullname}%`,
        })
      : query;

    // user_id
    params.user_id
      ? query.andWhere('user.id = :user_id', { user_id: params.user_id })
      : query;

    return query;
  }

  async findRequisition(req_id: number): Promise<Requisitions> {
    return await this.requisitionsRepository.findOne({
      where: { id: req_id },
      relations: {
        user: true,
        team: true,
        requisition_fields: {
          form_field: {
            form: {
              team: true,
            },
          },
        },
      },
    });
  }

  async findAllRequisitionsByUserId(userId: number): Promise<Requisitions[]> {
    return await this.requisitionsRepository
      .createQueryBuilder('requisition')
      .select([
        'requisition.date_create',
        'requisition.date_update',
        'requisition.status',
        'requisition.comment_leader',
        'requisition.id',
      ])
      .leftJoinAndSelect('requisition.status', 'status')
      .leftJoin('requisition.requisition_fields', 'rf')
      .leftJoin('rf.form_field', 'form_field')
      .leftJoin('form_field.form', 'form')
      .leftJoinAndSelect('requisition.team', 'team')
      .where('requisition.user.id = :userId', { userId })
      .orderBy('status.name', 'DESC')
      .getMany();
  }

  async findRequisitionField(dto: CreateRequisitionFieldDto) {
    const query = this.requisitionsFieldsRepository
      .createQueryBuilder('requisition_fields')
      .addSelect(['requisition_fields.id', 'requisition_fields.value']);

    // form_field
    dto.form_field
      ? query.andWhere('requisition_fields.form_fields_id = :form_fields_id', {
          form_fields_id: dto.form_field.id,
        })
      : query;

    // requisition_id
    dto.requisition
      ? query.andWhere('requisition_fields.requisition_id = :requisition_id', {
          requisition_id: dto.requisition.id,
        })
      : query;

    return query.getOne();
  }

  async createRequisitionFieldOrUpdate(
    dto: CreateRequisitionFieldDto,
  ): Promise<RequisitionFields> {
    const { value, requisition, form_field } = dto;

    const existingRequisitionField = await this.findRequisitionField(dto);

    const requisitionField = new RequisitionFields();
    requisitionField.value = value;
    requisitionField.requisition = requisition;
    requisitionField.form_field = form_field;

    if (existingRequisitionField) {
      requisitionField.id = existingRequisitionField.id;
    }

    return await this.requisitionsFieldsRepository.save(requisitionField);
  }

  async findOneRequisition(findRequisitionDto: FindRequisitionDto) {
    const query = this.requisitionsRepository
      .createQueryBuilder('requisition')
      .addSelect(['requisition.id', 'requisition.date_create'])
      .leftJoin('requisition.user', 'user')
      .leftJoin('requisition.team', 'team');

    //  requisition_id
    findRequisitionDto.requisition_id
      ? query.andWhere('requisition.id = :id', {
          id: findRequisitionDto.requisition_id,
        })
      : query;

    //  team_id
    findRequisitionDto.team_id
      ? query.andWhere('requisition.team_id = :team_id', {
          team_id: findRequisitionDto.team_id,
        })
      : query;

    //  user_id
    findRequisitionDto.user_id
      ? query.andWhere('requisition.user_id = :user_id', {
          user_id: findRequisitionDto.user_id,
        })
      : query;

    return query.getOne();
  }

  async createRequisitionOrUpdate(
    dto: CreateRequisitionDto,
    user: User,
  ): Promise<Requisitions> {
    // console.log(dto);
    const { team_id, fields } = dto;
    const team = await this.findOne(team_id);
    if (!team) throw new HttpException('Коллектив не найден', 401);
    const form = await this.formService.findOnFormFields(team_id);
    const status = await this.dictionaryService.findOne(18);

    const findRequisitionDto = new FindRequisitionDto();
    // findRequisitionDto.user_id = user.id;
    findRequisitionDto.team_id = team.id;

    let existingRequisition = await this.findOneRequisition(findRequisitionDto);

    const requisition = new Requisitions();
    requisition.fullname = '-';
    requisition.user = user;
    requisition.team = team;
    requisition.status = status;

    if (existingRequisition) {
      requisition.id = existingRequisition.id;
    }

    existingRequisition = await this.requisitionsRepository.save(requisition);

    if (
      existingRequisition &&
      form?.form_field &&
      form?.form_field.length > 0
    ) {
      for (let i = 0; i < fields.length; i++) {
        const requisitionFieldDto = new CreateRequisitionFieldDto();
        requisitionFieldDto.value = fields[i];
        requisitionFieldDto.requisition = existingRequisition;
        requisitionFieldDto.form_field = form.form_field[i];

        await this.createRequisitionFieldOrUpdate(requisitionFieldDto);
      }
    }

    return existingRequisition;
  }

  // requisition ------------------------------------------------------------------

  async teamsFunctions(id: number) {
    //начинаем с функций пользователя
    await this.functionsRepository
      .createQueryBuilder('functions')
      .innerJoin('functions.team', 'team')
      .addSelect('team.title')
      .where('functions.team_id = :id', { id: id })
      .getMany();
  }

  //архивировать или наоборот
  async changeArchiveTeam(id: number, isArchive: boolean) {
    return await this.teamsRepository.update(id, { is_archive: isArchive });
  }

  async addImage(id: number, filePath: string): Promise<Team> {
    const team = await this.findOne(id);
    team.image.push(filePath);

    return await this.teamsRepository.save({
      id: team.id,
      image: team.image,
    });
  }

  // ----------------------------------------------------------------------------
  // add role and user in team
  // ----------------------------------------------------------------------------
  async assignTeamRole(
    user: User,
    teamLeaderDto: AssignDirectionTeamLeaderDto,
  ) {
    // required permissions of initiator user
    let reqInitiatorPermission: Permissions;
    const directions = await this.findDirections();
    const dirIds = directions[0].map((team) => team.id);

    // check if it is direction
    if (dirIds.includes(teamLeaderDto.teamId)) {
      if (teamLeaderDto.roleName != TeamRoles.Leader) {
        throw new BadRequestException(
          'Нельзя добавлять участников в направления, только руководителей',
        );
      } else {
        reqInitiatorPermission = Permissions.CAN_ASSIGN_LEADER_DIRECTIONS;
        // check permissions of user for specific team or throw err
        await this.usersService.checkPermissions(
          user,
          [reqInitiatorPermission],
          true,
        );
        await this.assignTeamLeader(teamLeaderDto, Roles.LEADER_DIRECTION);
      }
      // if it is team and want to assign leaders
    } else if (teamLeaderDto.roleName == TeamRoles.Leader) {
      reqInitiatorPermission = Permissions.CAN_ASSIGN_LEADER_TEAM;
      // check permissions of user for specific team or throw err
      await this.usersService.checkPermissions(
        user,
        [reqInitiatorPermission],
        true,
      );
      await this.assignTeamLeader(teamLeaderDto, Roles.LEADER_TEAM);
    }

    const funcDto = new CreateFunctionDto();
    funcDto.team = teamLeaderDto.teamId;
    funcDto.title = teamLeaderDto.roleName;

    // find existing function with role or create new
    const func = await this.usersService.createFunctionIfNotExist(funcDto);
    for (const usrId of teamLeaderDto.userIds) {
      const ufDto = new CreateUserFunctionDto();
      ufDto.function = func.id;
      ufDto.user = usrId;
      ufDto.team = teamLeaderDto.teamId;

      // find existing user function or update
      try {
        await this.usersService.createUserFunctionOrUpdate(ufDto);
      } catch (e) {}
    }

    return true;
  }

  // назначить лидера направления, коллектива или по ирниту
  private async assignTeamLeader(
    teamLeaderDto: AssignDirectionTeamLeaderDto,
    typeGrantRole: Roles,
  ) {
    const team = await this.findOne(teamLeaderDto.teamId);

    // revoke perms old leaders if they are not in list
    if (team.functions)
      team.functions.forEach((func) => {
        if (func.title == TeamRoles.Leader && func.userFunctions) {
          func.userFunctions.forEach(async (userFunc) => {
            const oldLeader = new User();
            oldLeader.userId = userFunc.user.id;

            if (!teamLeaderDto.userIds.includes(oldLeader.userId)) {
              await this.usersService.changePermissions(
                oldLeader,
                PermissionsRoles.LEADER_TEAM,
                PermissionsActions.REVOKE,
              );
              await this.usersService.removeUserFunction(userFunc.id);
            }
          });
        }
      });

    let grantPerms: Permissions[] = [];
    // set permissions
    switch (typeGrantRole) {
      case Roles.LEADER_TEAM:
        grantPerms = PermissionsRoles.LEADER_TEAM;
        break;
      case Roles.LEADER_DIRECTION:
        grantPerms = PermissionsRoles.LEADER_DIRECTION;
        break;
    }
    // assign leadership to users
    for (const item of teamLeaderDto.userIds) {
      const assignPermsUser = new User();
      assignPermsUser.userId = item;

      await this.usersService.changePermissions(
        assignPermsUser,
        grantPerms,
        PermissionsActions.GRANT,
      );
    }
  }
}
