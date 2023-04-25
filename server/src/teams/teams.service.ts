import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { UsersService } from 'src/users/users.service';



@Injectable()
export class TeamsService {

  constructor(
    @InjectRepository(Team)  // user //,
    private readonly teamsRepository: Repository<Team>,
    @InjectRepository(User)  // user //,
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserFunction)
    private readonly userFunctionsRepository: Repository<UserFunction>,
    @InjectRepository(Function)
    private readonly functionsRepository: Repository<Function>,
    private readonly usersService: UsersService
  ) { }

  findOne(id: number) {
    return this.teamsRepository.findOneBy({ id: id });
  }


// Обновить коллектив
  async update(id: number, updateTeamDto: UpdateTeamDto) {

    console.log("updateTeamDto.charterTeam " + updateTeamDto.charterTeam)
    let team = await this.teamsRepository.save({
      id,
      ...updateTeamDto,
      charter_team: updateTeamDto.charterTeam,
    })


    // удалить прошлого лидера
    if (updateTeamDto.oldLeaderId != null && updateTeamDto.newLeaderId != null) {
      await this.usersService.removeLeader(team.id, updateTeamDto.oldLeaderId)

      // назначить нового пользвоателя
      let newUserFunction = await this.usersService.assignLeader(team, updateTeamDto.newLeaderId)

    }

    return team
  }


  //создать коллектив, с учетом, что есь минимум 1 лидер
  async create(createTeamDto: CreateTeamDto): Promise<Team> {

    let team = await this.teamsRepository.save({
      ...createTeamDto,
      charter_team: createTeamDto.charterTeam,
      image: [],
      tags: [],
      type_team: "teams",
      creation_date: new Date()
    })

    await this.usersService.assignLeader(team, createTeamDto.userID)

    return team;
  }

  // get all teams with leadeaders
  async findAll(): Promise<Team[]> {
    const head = "Руководитель"

    return this.teamsRepository
      .createQueryBuilder("teams")

      .select(["teams.id", "teams.title", "teams.tags", "teams.image", "teams.description",
        "teams.short_description", "teams.type_team", "teams.cabinet", "teams.is_archive", "teams.document", "teams.shortname", "teams.charter_team"])
      .where("teams.type_team = :type", { type: "teams" })
      .leftJoin("teams.functions", "functions")
      .addSelect("functions.title")
      .andWhere("functions.title = :head", { head: head })

      .leftJoin("functions.userFunctions", "user_functions")
      .addSelect("user_functions.id")
      .leftJoinAndSelect("user_functions.user", "user")
      // .addSelect("user.title_role")
      .orderBy("teams.id", "DESC")
      .getMany()
  }


  // get all teams of specific direction for statistic
  async findAllTeamsOfDirection(type_team = "teams", id_parent = -1): Promise<[Team[], number]> {


    let teams = this.teamsRepository
      .createQueryBuilder("teams")

      .select(["teams.id", "teams.title", "teams.image", "teams.description", "teams.type_team",
        "teams.shortname"])
      .where("teams.type_team = :type", { type: type_team })

    // с учетом направления
    if (id_parent > 0) {
      teams.andWhere("teams.id_parent = :id_parent ", { id_parent: id_parent })
        .leftJoin("teams.id_parent", "id_parent")
        .addSelect(["id_parent.id", "id_parent.shortname"])
    }

    return teams.getManyAndCount()
  }

  //вывести команду
  async teamWithUsers(id: number): Promise<UserFunction[]> {

    const users = await this.userFunctionsRepository

      .createQueryBuilder("user_functions")
      .select(["user_functions.dateStart", "user_functions.dateEnd"])
      .leftJoinAndSelect("user_functions.user", "user")
      .innerJoin("user_functions.function", "function")
      .addSelect('function.title')
      .innerJoin("function.team", "team")
      .where("team.id = :id", { id })
      .getMany()
    return users;
  }


  // async  directionsAndUsers() {

  //   const directionsUsers = await this.teamsRepository
  //   .createQueryBuilder("teams")
  //   .select("teams.direction")
  //   .getMany()
  //   return directionsUsers
  // }

  async teamsFunctions(id: number) {
    //начинаем с функций пользователя
    const teamsFunctions = await this.functionsRepository
      .createQueryBuilder("functions")
      .innerJoin("functions.team", "team")
      .addSelect("team.title")
      .where("functions.team_id = :id", { id: id })
      .getMany()

    return teamsFunctions
  }


  //архивировать или наоборот
  async changeArchiveTeam(id: number, isArchive: boolean) {

    return await this.teamsRepository.update(id, { is_archive: isArchive })
  }

}



