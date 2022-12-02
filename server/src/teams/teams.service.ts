import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

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

  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findAll() {
    return `This action returns all teams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
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

}



