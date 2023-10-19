import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CreateFunctionDto } from './dto/create-functions.dto';
import { CreateUserFunctionDto } from './dto/create-user-function.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Function } from './entities/function.entity';
import { User } from './entities/user.entity';
import { UserFunction } from './entities/user_function.entity';
import * as argon2 from 'argon2';
import { validate } from 'class-validator';
import { Team } from '../teams/entities/team.entity';
import { UserFunctionDto } from './dto/user-functions.dto';
import { FunctionDto } from './dto/functions.dto';

const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // user //,
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserFunction)
    private readonly userFunctionsRepository: Repository<UserFunction>,
    @InjectRepository(Function)
    private readonly functionsRepository: Repository<Function>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async findByName(limit: number, name: string, email: string) {
    return await this.usersRepository.find({
      take: limit,
      where: [{ fullname: Like(`%${name}%`) }, { email: Like(`%${email}%`) }],
    });
  }
  async update(updateUserDto: UpdateUserDto, id: number) {
    return this.usersRepository.update(+id, updateUserDto);
  }

  // TODO del-feat add role
  // async addRole(education_group, title_role) {}

  async findAllWithLimit(limit: number): Promise<User[]> {
    return await this.usersRepository.find({ take: limit });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.createQueryBuilder('users').getMany();
  }

  // modernize function user if user not exist
  // @HttpCode(400)
  // async findOneWithFunction(id: number) { // Все робит но нужно добавить условие если нет коллективов у юзера вывести общую инфу

  //   // if(isNaN(id)){
  //   //   throw new HttpException("такого юзера не существует " + id, 400)
  //   // }

  //   const userExist = await this.usersRepository
  //     .createQueryBuilder("users")
  //     .where("users.id = :id", { id })
  //     .leftJoin("users.user_function", "user_function")
  //     .addSelect("user_function")
  //     .leftJoin("user_function.functions", "functions")
  //     .addSelect("functions")
  //     .leftJoinAndSelect("functions.team", "teams")
  //     .addSelect("teams")
  //     .getOne();

  //   // console.log("userExist " + userExist)
  //   if (!userExist) {
  //     throw new HttpException("такого юзера не существует ", 400)
  //   }

  //   return userExist

  // }

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username })
      .getOne();

    if (user && (await argon2.verify(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async findOne(email: string): Promise<any> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    // check uniqueness of username/email
    const { username, email, password } = dto;
    const qb = await this.usersRepository
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
      throw new HttpException({ errors }, 401);
    }
    return user;
  }

  // checkers---------------------------------------------------------------------------
  // check permissions
  async hasPermissions(userId: number, requiredPermissions: string[]) {
    let userHaveAllPermissions = true;
    //  get user and its permissions
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    // console.log("user", user.permissions, "req ", requiredPermissions)

    // go throught req permissions
    requiredPermissions.forEach((reqPermission) => {
      let havePermission = false;
      //  go throught user permissions
      for (let i = 0; i < user.permissions.length; i++) {
        if (user.permissions[i] === reqPermission) {
          havePermission = true;
          break;
        }
      }
      // if one from permissions not granted then return false
      if (!havePermission) {
        userHaveAllPermissions = false;
        return userHaveAllPermissions;
      }
    });

    return userHaveAllPermissions;
  }

  // проверить есть ли у юзера специальные
  async hasPermissionsInTeam(
    userId: number,
    teamId: number,
    permissions: string[],
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
      // special for admin
      .orWhere('user.username = :name', { name: 'admin' })
      .getMany();

    return permissisonsInTeam && permissisonsInTeam.length > 0;
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

  //назначить роль юзеру в коллективе
  async assignRole(teamId: number, userId: number, roleName: string) {
    const funcDto = new CreateFunctionDto();
    funcDto.team = teamId;
    funcDto.title = roleName;

    // find existing function with role or update
    const func = await this.createFunctionIfNotExist(funcDto);

    const ufDto = new CreateUserFunctionDto();
    ufDto.function = func.id;
    ufDto.user = userId;

    // find existing user function or update
    const existUFs = await this.createUserFunctionOrUpdate(ufDto);

    return existUFs;
  }

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

    uF = await this.userFunctionsRepository.save({
      id: uF ? uF.id : null,
      ...createUserFunctionDto,
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
