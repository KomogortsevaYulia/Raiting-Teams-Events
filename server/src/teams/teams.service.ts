import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserFunction } from 'src/users/entities/user_function.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';



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
  ) { }

  findOne(id: number) {
    return this.teamsRepository.findOneBy({ id: id });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }

   // get all teams with leadeaders
   async findAll(): Promise<Team[]> {
    const head = "Руководитель"

    return this.teamsRepository
      .createQueryBuilder("teams")

      .select(["teams.id", "teams.title",  "teams.image","teams.description","teams.type_team"])
      .where("teams.type_team = :type", {type: "teams" })
      .leftJoin("teams.functions", "functions")
      .addSelect("functions.title")
      .andWhere("functions.title = :head", { head: "Руководитель" })

      .leftJoin("functions.userFunctions", "user_functions")
      .addSelect("user_functions.id")
      .leftJoinAndSelect("user_functions.user", "user")
      .addSelect("user.title_role")

      .getMany()
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

  async create(@Body() createTeamDto: CreateTeamDto):Promise<Team> {

    createTeamDto.creation_date = new Date()
    createTeamDto.type_team = "teams"
    //fields need make null
    createTeamDto.image = []
    createTeamDto.tags = []

    let team = await this.teamsRepository.save(createTeamDto)
    return team;
  }

}



