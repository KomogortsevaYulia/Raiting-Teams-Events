import {
  BadRequestException,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFunctionDto } from './dto/create-functions.dto';
import { CreateUserFunctionDto } from './dto/create-user-function.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TeamFunction } from './entities/function.entity';
import { User } from './entities/user.entity';
import { UserFunction } from './entities/user_function.entity';
import * as argon2 from 'argon2';
import { validate } from 'class-validator';
import { Team } from '../teams/entities/team.entity';
import { UserFunctionDto } from './dto/user-functions.dto';
import { FunctionDto } from './dto/functions.dto';
import { Permissions } from '../shared/permissions';
import { PermissionsActions } from '../general/enums/action-permissions';
import { UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { TeamPermissions } from '../shared/teamPermissions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // user //,
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserFunction)
    private readonly userFunctionsRepository: Repository<UserFunction>,
    @InjectRepository(TeamFunction)
    private readonly functionsRepository: Repository<TeamFunction>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async authorizeBitrix(code: string) {
    const client_id = process.env.BITRIX_CLIENT_ID;
    const client_secret = process.env.BITRIX_CLIENT_SECRET;

    try {
      const tokenResponse = await axios.get(
        'https://int.istu.edu/oauth/token/?grant_type=authorization_code',
        {
          params: {
            code,
            client_id,
            client_secret,
          },
        },
      );

      const tokenData = tokenResponse.data;

      if (tokenData.error) {
        throw new Error(tokenData.error_description);
      }

      const userInfoResponse = await axios.get(
        tokenData.client_endpoint + 'user.info.json',
        {
          params: {
            auth: tokenData.access_token,
          },
        },
      );

      const userInfoData = userInfoResponse.data;

      if (userInfoData.error) {
        throw new Error(userInfoData.error_description);
      }
      return userInfoData.result;
    } catch (error) {
      throw new UnauthorizedException(
        `Не удалось авторизоваться через Кампус: ${error}`,
      );
    }
  }

  async loginBitrix(code: string) {
    const userBitrixData = await this.authorizeBitrix(code);
    const user = await this.findByBitrixId(userBitrixData.id);

    if (user) {
      return user;
    } else {
      const newUser = new User();
      newUser.bitrix_id = userBitrixData.id;
      newUser.email = userBitrixData.email;
      newUser.username = userBitrixData.email;
      newUser.password = 'stud';
      newUser.fullname = `${userBitrixData.last_name} ${userBitrixData.name} ${userBitrixData.second_name}`;
      return await this.usersRepository.save(newUser);
    }
  }

  async findByBitrixId(bitrix_id: number): Promise<User> {
    return this.usersRepository.findOneBy({ bitrix_id: bitrix_id });
  }

  async findUser(limit: number, offset: number, searchTxt: string) {
    let query = this.usersRepository
      .createQueryBuilder('users')
      .orderBy('users.fullname', 'ASC')
      .limit(limit)
      .offset(offset);

    if (searchTxt) {
      searchTxt = searchTxt.toLowerCase();
      query = query.andWhere(
        `(LOWER(users.fullname) like :fullname 
         or LOWER(users.email) like :email)`,
        {
          fullname: `%${searchTxt}%`,
          email: `%${searchTxt}%`,
        },
      );
    }

    return await query.getManyAndCount();
  }

  async update(updateUserDto: UpdateUserDto, id: number) {
    return this.usersRepository.update(+id, updateUserDto);
  }

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username })
      .getOne();

    if (user && (await argon2.verify(user.password, pass))) {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    // check uniqueness of username/email
    const { username, email, password } = dto;
    const qb = this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.usersRepository.save(newUser);
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();

    if (!user) {
      const errors = { User: 'Not found' };
      throw new BadRequestException({ errors });
    }
    return user;
  }

  // checkers---------------------------------------------------------------------------
  // check permissions
  async checkPermissions(
    user: User,
    requiredPermissions: Permissions[],
    throwErrIfHavent = true,
  ) {
    let userHaveAllPermissions = true;
    //  get user and its permissions
    user = await this.usersRepository.findOne({ where: { id: user.userId } });
    // check if it is admin
    const isAdmin = user.permissions.includes(Permissions.CAN_ALL);
    // go through req permissions (with AND checking for perms)
    if (!isAdmin)
      requiredPermissions.forEach((reqPermission) => {
        const havePermission = user.permissions.includes(reqPermission);

        //if one from permissions not granted then return false
        if (!havePermission) {
          userHaveAllPermissions = false;
          if (throwErrIfHavent)
            throw new ForbiddenException(
              `У Вас нет разрешений: ${requiredPermissions}`,
            );
          else return userHaveAllPermissions;
        }
      });

    return userHaveAllPermissions;
  }

  // TODO: переделать запрос changePermissions, плохо читать
  // add/revoke permissions to user
  async changePermissions(
    user: User,
    permissions: Permissions[],
    permissionActions = PermissionsActions.GRANT,
  ) {
    user = await this.usersRepository.findOne({ where: { id: user.userId } });
    const newPerms: string[] = [];
    // user can have no perms
    if (!user) return false;
    user.permissions = user.permissions ?? [];

    const validPerms = Object.values(Permissions);

    permissions?.forEach((reqPermission: Permissions) => {
      // console.log(reqPermission, user.id, newPerms, user.permissions, permissionActions);

      // if permission exist in system
      const permIsValid = validPerms.includes(reqPermission);

      if (permIsValid) {
        const havePermission = user.permissions.includes(reqPermission);
        // GRANT
        if (permissionActions == PermissionsActions.GRANT && !havePermission)
          newPerms.push(reqPermission);
        // REVOKE
        else if (
          permissionActions == PermissionsActions.REVOKE &&
          havePermission
        )
          newPerms.push(reqPermission);
        // REPLACE
        else if (permissionActions == PermissionsActions.REPLACE) {
          const havePermission = newPerms.includes(reqPermission);
          if (!havePermission) newPerms.push(reqPermission);
        }
      }
    });

    // GRANT need permissionActions, add perms to user
    if (permissionActions == PermissionsActions.GRANT)
      user.permissions.push(...newPerms);
    // REVOKE need revoke, del perms from user
    else if (
      permissionActions == PermissionsActions.REVOKE &&
      user.permissions.length > 0
    ) {
      user.permissions = user.permissions.filter((perm) => {
        return !newPerms.includes(perm);
      });
    }
    // REPLACE
    else if (permissionActions == PermissionsActions.REPLACE)
      user.permissions = newPerms;

    // save user with new perms
    await this.usersRepository.save(user);
    return true;
  }

  // проверить есть ли у юзера специальные
  async hasPermissionsInTeam(
    userId: number,
    teamId: number,
    permissions: TeamPermissions[],
    throwErr = false,
  ) {
    const permissisonsInTeam = await this.userFunctionsRepository
      .createQueryBuilder('user_function')
      .leftJoin('user_function.function', 'function')
      .leftJoin('user_function.user', 'user')
      .leftJoin('function.team', 'team')
      .where('user.id = :user_id', { user_id: userId })
      .andWhere('team.id = :team_id', { team_id: teamId })
      .andWhere('function.type_function in (:...type_functions) ', {
        type_functions: permissions,
      })
      .getMany();

    const havePerms = permissisonsInTeam && permissisonsInTeam.length > 0;

    if (havePerms) return true;
    else if (!throwErr) return false;
    else {
      throw new ForbiddenException(`У Вас нет разрешений: ${permissions}`);
    }
  }

  async hasPermissionsSystemOrTeam(
    user: User,
    teamId: number,
    teamPermissions: TeamPermissions[],
    systemPermissions: Permissions[],
  ) {
    const systemP = await this.checkPermissions(user, systemPermissions, false);

    const teamP = await this.hasPermissionsInTeam(
      user.userId,
      teamId,
      teamPermissions,
      false,
    );

    // console.log(systemP, teamP, user, teamId, teamPermissions, systemPermissions)
    if (!systemP && !teamP)
      throw new ForbiddenException(
        'У вас нет разрешений: ' +
          TeamPermissions.SPECIAL +
          ' или ' +
          Permissions.CAN_CREATE_TEAMS,
      );

    return true;
  }

  // checkers---------------------------------------------------------------------------

  // function--------------------------------------------------------------------
  async createFunctionIfNotExist(createFunctionDto: CreateFunctionDto) {
    // find existing function for team
    const fD = new FunctionDto();
    fD.team = createFunctionDto.team;
    fD.title = createFunctionDto.title;

    const existFs = await this.findFunctions(fD);
    let func = existFs ? existFs[0] : null;

    const team = await this.teamRepository.findOneOrFail({
      where: { id: createFunctionDto.team },
    });
    // если не существует функции, то создать новую
    if (!func) {
      //создать фукнцию
      func = await this.functionsRepository.save({
        ...createFunctionDto,
        team: team,
      });
    }

    return func;
  }

  async updateFunction(
    idFunction: number,
    createFunctionDto: CreateFunctionDto,
  ) {
    const team = await this.teamRepository.findOneOrFail({
      where: { id: createFunctionDto.team },
    });

    await this.functionsRepository.update(idFunction, {
      ...createFunctionDto,
      team: team,
    });
  }

  // найти функции по ид команды
  async findFunctions(functionDto: FunctionDto) {
    const query = this.functionsRepository
      .createQueryBuilder('functions')
      .leftJoin('functions.team', 'team')
      .addSelect('team.id');

    // team
    functionDto.team
      ? query.andWhere('team.id = :id', { id: functionDto.team })
      : query;
    // title
    functionDto.title
      ? query.andWhere('functions.title = :title', { title: functionDto.title })
      : query;

    return await query.getMany();
  }

  async removeFunction(id: number) {
    const res = await this.functionsRepository.delete(id);

    return res;
  }

  // modernize function user if user not exist
  @HttpCode(400)
  async findOneWithFunction(id: number) {
    // Все робит но нужно добавить условие если нет коллективов у юзера вывести общую инфу

    if (isNaN(id)) {
      throw new HttpException('такого юзера не существует ' + id, 400);
    }

    const userExist = await this.userFunctionsRepository
      .createQueryBuilder('user_function')
      .leftJoin('user_function.function', 'functions')
      .addSelect('functions')
      .leftJoinAndSelect('functions.team', 'teams')
      .addSelect('teams')
      .where('user_function.user = :id', { id })
      .getMany();

    if (!userExist) {
      throw new HttpException('такого юзера не существует ', 400);
    }
    return userExist;
  }

  // function--------------------------------------------------------------------

  //user functions---------------------------------------------------------------
  @HttpCode(400)
  async createUserFunctionOrUpdate(
    createUserFunctionDto: CreateUserFunctionDto,
  ): Promise<UserFunction> {
    const uFDto = new UserFunctionDto();
    uFDto.function = createUserFunctionDto.function;
    uFDto.user = createUserFunctionDto.user;

    const uFs = await this.findUserFunctions(uFDto);
    let uF = uFs ? uFs[0] : null;

    const dateStart = new Date();
    const dateEnd = new Date();
    dateEnd.setFullYear(dateEnd.getFullYear() + 1); //only on one year set

    // const user = await this.usersRepository.findOneOrFail({where:{id:createUserFunctionDto.user}})

    const user = await this.findById(createUserFunctionDto.user);
    const func = await this.findFunction(createUserFunctionDto.function);
    const team = await this.teamRepository.findOneBy({
      id: createUserFunctionDto.team,
    });

    uF = await this.userFunctionsRepository.save({
      id: uF ? uF.id : null,
      user,
      function: func,
      team,
      dateStart: dateStart,
      dateEnd: dateEnd,
    });

    return uF;
  }

  async removeUserFunction(id: number) {
    const query = this.userFunctionsRepository
      .createQueryBuilder('user_functions')
      .where('user_functions.id = :id', { id });

    return await query.delete().execute();
  }

  async findFunction(id: number) {
    const query = this.functionsRepository
      .createQueryBuilder('functions')
      .where('functions.id = :id', { id });

    return await query.getOne();
  }

  async findUserFunctions(userFDto: UserFunctionDto) {
    const query = this.userFunctionsRepository
      .createQueryBuilder('user_functions')
      .leftJoin('user_functions.function', 'function')
      .leftJoin('user_functions.user', 'user')
      .leftJoin('function.team', 'team');

    // function
    userFDto.function
      ? query.andWhere('function.id = :function_id', {
          function_id: userFDto.function,
        })
      : query;
    // user
    userFDto.user
      ? query.andWhere('user.id = :user_id', { user_id: userFDto.user })
      : query;
    // team
    userFDto.team
      ? query.andWhere('team.id = :team_id', { team_id: userFDto.team })
      : query;

    return await query.getMany();
  }

  //user functions---------------------------------------------------------------
}
