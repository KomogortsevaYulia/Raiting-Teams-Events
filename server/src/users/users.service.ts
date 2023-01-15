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
import { UserRO } from './user.interface';
import { UpdateFunctionDto } from './dto/update-functions.dto';
import { Team } from '../teams/entities/team.entity';
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

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   const user = new User();
  //   user.fullname = createUserDto.fullname;
  //   user.birthdate = createUserDto.birthdate;
  //   user.studnumber = createUserDto.studnumber;
  //   user.email = createUserDto.email;
  //   user.gender = createUserDto.gender;
  //   user.education_group = createUserDto.education_group;
  //   user.institute = createUserDto.institute;
  //   user.type_time_study = createUserDto.type_time_study;
  //   user.phone = createUserDto.phone;
  //   user.permissions = createUserDto.permissions;
  //   return this.usersRepository.save(user);
  // }


  async findByName(limit: number, name: string, email: string) {

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
  @HttpCode(400)
  async findOneWithFunction(id: number) { // Все робит но нужно добавить условие если нет коллективов у юзера вывести общую инфу
    //вот зачем нужен left join в случае, если у юзера нет функций при иннер джоин,
    //то в запросе выдаст, что юзера не существует, а так он его выдаст, если тот есть  

    // if(isNaN(id)){
    //   throw new HttpException("такого юзера не существует " + id, 400)
    // }

    const userExist = await this.usersRepository
      .createQueryBuilder("users")
      .where("users.id = :id", { id })
      .leftJoin("users.user_function", "user_function")
      .addSelect("user_function")
      .leftJoin("user_function.functions", "functions")
      .addSelect("functions")
      .leftJoinAndSelect("functions.team", "teams")
      .addSelect("teams")

      .getOne();

    // console.log("userExist " + userExist)
    if (!userExist) {
      throw new HttpException("такого юзера не существует ", 400)
    }

    return userExist

  }

  async login({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
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
      return this.buildUserRO(savedUser);
    }

  }

  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      email: user.email,
      token: this.generateJWT(user),
    };

    return { user: userRO };
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }



  




  // function--------------------------------------------------------------------
  async createFunction(createFunctionDto: CreateFunctionDto): Promise<Function> {
    return await this.functionsRepository.save(createFunctionDto);
  }

  //найти функуии по ид команды
  async findFunctionByTeamId(teamId: number) {
    return await this.functionsRepository
      .createQueryBuilder('functions')
      .innerJoin('functions.team', 'team')
      .where('team.id = :id', { id: teamId })
      .getMany()

  }

  //обновить функцию
  async updateFunction(updateFunctionDto: UpdateFunctionDto) {
    return await this.functionsRepository.update(updateFunctionDto.id, updateFunctionDto);
  }

  // function--------------------------------------------------------------------









  //user functions---------------------------------------------------------------
  @HttpCode(400)
  async createUserFunction(createUserFunctionDto: CreateUserFunctionDto): Promise<UserFunction> {

    //check if user is exist, if not, then error 400 will
    this.findOneWithFunction(createUserFunctionDto.user)

    let dateStart = new Date();

    let dateEnd = new Date();
    dateEnd.setFullYear(dateEnd.getFullYear() + 1) //only on one year set 

    return await this.userFunctionsRepository.save({
      ...createUserFunctionDto,
      dateStart: dateStart,
      dateEnd: dateEnd
    });
  }


   //найти функуии usera по ид команды
   async findUserFunctionsByFunctionId(functionId: number) {
   
    let func = await this.userFunctionsRepository
      .createQueryBuilder('user_function')
      .select("user_function.id")
      .leftJoinAndSelect('user_function.functions', 'functions')
      // .where('functions.id = :id', { id: functionId })
      .getMany()

    // let func =  await this.userFunctionsRepository.find({relations:{function:true}})
      // console.log("inner  " + func[0].user + "   func id " + functionId)
      return func
  }

  //обновить функцию пользователя
  async updateUserFunction(userFunction:UserFunction) {
    return await this.userFunctionsRepository.update({id:userFunction.id}, userFunction)
  }

  //user functions---------------------------------------------------------------

}


