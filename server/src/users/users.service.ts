import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFunction } from './entities/user_function.entity';
import { SECRET } from '../config';
import { LoginUserDto } from './dto/login-user.dto';
import * as argon2 from 'argon2';
import { validate } from 'class-validator';
import { UserRO } from './user.interface';
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

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneWithFunction(id: number) { // Все робит но нужно добавить условие если нет коллективов у юзера вывести общую инфу
     return this.usersRepository
    .createQueryBuilder("users")
    .innerJoin("users.user_function", "user_function")
    .addSelect("user_function")
    .innerJoin("user_function.functions", "functions")
    .addSelect("functions")
    .innerJoinAndSelect("functions.team", "teams")
    .addSelect("teams")
    .where("users.id = :id", {id})
    .getOne()
  }
  
  async login({email, password}: LoginUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({email});
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }


  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };

  async create(dto: CreateUserDto): Promise<UserRO> {

    // check uniqueness of username/email
    const {username, email, password} = dto;
    const qb = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = {username: 'Username and email must be unique.'};
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);

    }

    // create new user
    let newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    // newUser.articles = [];

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = {username: 'Userinput is not valid.'};
      throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);

    } else {
      const savedUser = await this.usersRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }

  }

  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      // studnumber: user.studnumber,
      // fullname: user.fullname,
      email: user.email,
      token: this.generateJWT(user),
    };

    return {user: userRO};
  }

  async findById(id: number): Promise<UserRO>{
    const user = await this.usersRepository.findOneBy({id});

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 401);
    }

    return this.buildUserRO(user);
  }
}


