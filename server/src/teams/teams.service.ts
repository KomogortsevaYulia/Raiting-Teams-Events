import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserFunction } from 'src/users/entities/user_function.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { Repository } from 'typeorm';
import { Function } from '../users/entities/function.entity';
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

    create(createTeamDto: CreateTeamDto): Promise<Team>{
    const team = new Team();
    team.title = createTeamDto.title;
    team.direction = createTeamDto.direction;
    team.image = createTeamDto.image;
    team.creation_date = createTeamDto.creation_date;
    console.log(team)
    return this.teamsRepository.save(team);
  }

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
  async findAll():Promise<Team[]> {

    const head = "руководитель"

    return this.teamsRepository
    .createQueryBuilder("teams")
    .select(["teams.id", "teams.title", "teams.direction", "teams.image"])
    .innerJoin("teams.functions","functions")
    .addSelect("functions.title")
    .where("functions.title = :head", {head:head})

    .innerJoin("functions.userFunctions", "user_functions")
    .addSelect("user_functions.id")
    .innerJoinAndSelect("user_functions.user", "user")
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
}



