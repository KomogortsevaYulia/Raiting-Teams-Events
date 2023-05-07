import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { UsersService } from '../users/users.service';
import { SearchTeamDto } from './dto/search-team.dto';



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

  async findOne(id: number) {
    console.log("enterdddddddddddddd " )
    let res = await this.teamsRepository.findOneBy({ id: id })
    console.log("enter" + res)

    return res;
  }


// Обновить коллектив
  async update(id: number, updateTeamDto: UpdateTeamDto) {

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
  async findAll(params: SearchTeamDto): Promise<Team[]> {
    const head = "Руководитель"

    let query = await this.teamsRepository
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

      query = await this.filterTeam(params, query)

      let team = await query.getMany()
      return team
  }



   // по умному как то переделать потом!!!
   async filterTeam(params: SearchTeamDto, q: SelectQueryBuilder<Team>) {

    let query = q

    // let buildSQL = (columnName, value)=>{
    //   query.andWhere(`LOWER(${columnName}) like :value`, {value: `%${params.title}%`})
    // }

    //если у нас все параметры то через 'или' все ищем
    if (params.title && params.description && params.tags) {
      
      //делаем все столбцы в нижнем регистре и ищем по всем столбцам через предлог "или"
      query = query.andWhere(
        "(LOWER(teams.title) like :title"
        + " or LOWER(teams.description) like :description"
        + " or LOWER(teams.tags) like :tags)", {
        title: `%${params.title}%`,
        description: `%${params.description}%`,
        tags: `%${params.tags}%`
      })
    } else { //если не все параметры, то ищем через 'и'
     
      //if title (если у нас есть тайтл то ищем по нему)
      query = params.title ? query.andWhere("LOWER(teams.title) like :title", { title: `%${params.title}%` }) : query
      //if description
      query = params.description ? query.andWhere("LOWER(teams.description) like :description", { description: `%${params.description}%` }) : query
      //if description
      query = params.tags ? query.andWhere("LOWER(teams.tags) like :tags", { tags: `%${params.tags}%` }) : query
    }


    return query
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



