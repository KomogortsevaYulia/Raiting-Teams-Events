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
import { Team } from 'src/teams/entities/team.entity';
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
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
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

  async findAllWithLimit(limit: number): Promise<User[]> {
    return await this.usersRepository.find({ take: limit });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.createQueryBuilder("users").getMany();
  }

  async generateFunctions(): Promise<Function[]> {
    // let functions = await this.functionsRepository
    //   .createQueryBuilder("functions")
    //   .where("functions.title = :type_team", { type_team: "Участник" })
    //   .getMany()

    let id_user = this.generateArray(5, 45)
    id_user.forEach(async user => {
      await this.userFunctionsRepository
        .createQueryBuilder()
        .insert()
        .into(UserFunction)
        .values([
          {
            dateStart: new Date(), function:43,
            user: user
          }
        ])
        .execute()

    })
    return await this.functionsRepository.createQueryBuilder("functions").getMany();
  }

  //генерация челов
  async generate(): Promise<User[]> {

    let fullname = ["Самсонов Кирилл Львович", "Васильева Ева Матвеевна", "Сахарова Елизавета Михайловна", "Иванов Роман Павлович", "Киселев Ярослав Александрович", "Семенова Алиса Андреевна", "Позднякова Вероника Алиевна", "Иванова Николь Марковна", "Ермаков Никита Артёмович", "Савельев Валерий Иванович", "Кузнецов Дмитрий Владиславович", "Филиппов Даниил Богданович", "Соколов Макар Миронович", "Баранова Варвара Владиславовна", "Соболев Никита Львович", "Голованова Вера Павловна", "Гончаров Фёдор Витальевич", "Иванов Степан Максимович", "Новикова София Тимофеевна", "Агафонова Алиса Денисовна", "Цветков Марсель Степанович", "Гордеева Кира Кирилловна", "Румянцев Даниил Константинович", "Пономарева Мария Марковна", "Смирнова Виктория Петровна", "Пономарев Александр Артёмович", "Киселев Владимир Андреевич", "Устинова Александра Артёмовна", "Иванова Анна Никитична", "Самсонов Дмитрий Платонович"]
    let users = await this.usersRepository
      .createQueryBuilder("users")
      .where("id IN (:...ids)", { ids: this.generateArray(24, 34) })
      .getMany()

    let institutes = ["Институт авиамашиностроения и транспорта", "Институт архитектуры, строительства и дизайна",
      "Институт недропользования", "Институт высоких технологий", "Институт информационных технологий и анализа данных"]

    let group = ["ТХб-19-2", "ИСТб-19-2", "ДСб-20-1", "БТПб-20-1", "ЛМБм-21-1", "УПКм-22-1"]
    let type_time_study = ["Очно", "Очно-заочно", "Заочно"]
    users.forEach(async user => {
      await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({
          institute: institutes[this.getRandomInt(institutes.length, 0)],
          education_group: group[this.getRandomInt(group.length, 0)],
          fullname: fullname.shift(),
          type_time_study: type_time_study[this.getRandomInt(2, 0)],
          studnumber: this.getRandomInt(1000000, 9999999)
        })
        .where("id = :id", { id: user.id })
        .execute();
      delete fullname[0];
    })

    return await this.usersRepository.createQueryBuilder("users").getMany();
  }

  generateArray(size, start) {
    return Array.from({ length: size }, (_, index) => index + start);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
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


