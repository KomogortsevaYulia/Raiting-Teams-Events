import { Body, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, getRepository, Repository } from 'typeorm';

import { CreateFunctionDto } from './dto/create-functions.dto';
import { CreateUserFunctionDto } from './dto/create-user-function.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Function } from './entities/function.entity';
import { User } from './entities/user.entity';
import { UserFunction } from './entities/user_function.entity';
import { SECRET } from '../config';
import { LoginUserDto } from './dto/login-user.dto';
import * as argon2 from 'argon2';
import { validate } from 'class-validator';
const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)  // user //,
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserFunction)
    private readonly userFunctionsRepository: Repository<UserFunction>,
    @InjectRepository(Function)
    private readonly functionsRepository: Repository<Function>,
  ) { }

  async findByName(limit: number, name: string, email: string) {

    // console.log("email " + email)
    // console.log( "    user " + name)
    //can i make sql injection?
    return await this.usersRepository.find({
      take: limit,
      where: [
        { fullname: Like(`%${name}%`) },
        { email: Like(`%${email}%`) }
      ]
    })

  }
  async findAll(limit: number): Promise<User[]> {
    return await this.usersRepository.find({ take: limit });
  }


  // modernize function user if user not exist
  // @HttpCode(400)
  // async findOneWithFunction(id: number) { // Все робит но нужно добавить условие если нет коллективов у юзера вывести общую инфу
  //   //вот зачем нужен left join в случае, если у юзера нет функций при иннер джоин,
  //   //то в запросе выдаст, что юзера не существует, а так он его выдаст, если тот есть  

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
      .createQueryBuilder("users")
      .where("users.username = :username", { username })
      .getOne();
    if (user && await argon2.verify(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async findOne(email: string): Promise<any> {
    return this.usersRepository.findOneBy({ email: email });
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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
      throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);

    }

    // create new user
    let newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);

    } else {
      const savedUser = await this.usersRepository.save(newUser);
      return savedUser;
    }

  }

  async findById(id: number): Promise<User> {
     const user = await this.usersRepository.
      createQueryBuilder("users")
      .where("users.id = :id", { id })
      .getOne();
      
    if (!user) {
      const errors = { User: 'Not found' };
      throw new HttpException({ errors }, 401);
    }
    return user;
  }

  // function--------------------------------------------------------------------
  async createFunction(createFunctionDto: CreateFunctionDto): Promise<Function> {
    return await this.functionsRepository.save(createFunctionDto);
  }


  // function--------------------------------------------------------------------



  //user functions---------------------------------------------------------------
  @HttpCode(400)
  async createUserFunction(createUserFunctionDto: CreateUserFunctionDto): Promise<UserFunction> {

    //check if user is exist, if not, then error 400 will
    //this.findOneWithFunction(createUserFunctionDto.user)

    let dateStart = new Date();

    let dateEnd = new Date();
    dateEnd.setFullYear(dateEnd.getFullYear() + 1) //only on one year set 

    return await this.userFunctionsRepository.save({
      ...createUserFunctionDto,
      dateStart: dateStart,
      dateEnd: dateEnd
    });
  }
  //user functions---------------------------------------------------------------

}


