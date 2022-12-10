import { Body, HttpCode, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateFunctionDto } from './dto/create-functions.dto';
import { CreateUserFunctionDto } from './dto/create-user-function.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Function } from './entities/function.entity';
import { User } from './entities/user.entity';
import { UserFunction } from './entities/user_function.entity';

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
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.fullname = createUserDto.fullname;
    user.birthdate = createUserDto.birthdate;
    user.studnumber = createUserDto.studnumber;
    user.email = createUserDto.email;
    user.gender = createUserDto.gender;
    user.education_group = createUserDto.education_group;
    user.institute = createUserDto.institute;
    user.type_time_study = createUserDto.type_time_study;
    user.phone = createUserDto.phone;
    user.permissions = createUserDto.permissions;
    return this.usersRepository.save(user);
  }

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


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }


  // function--------------------------------------------------------------------
  async createFunction(@Body() createFunctionDto: CreateFunctionDto): Promise<Function> {

    // console.log(createFunctionDto)
    return await this.functionsRepository.save(createFunctionDto);
  }


  // function--------------------------------------------------------------------



  //user functions---------------------------------------------------------------
  @HttpCode(400)
  async createUserFunction(@Body() createUserFunctionDto: CreateUserFunctionDto): Promise<UserFunction> {

    //check if user is exist, if not, then error 400 will
    // console.log("createUserFunctionDto.user " + createUserFunctionDto.user)
    this.findOneWithFunction(createUserFunctionDto.user)

    createUserFunctionDto.dateStart = new Date();

    let end = new Date();
    end.setFullYear(end.getFullYear() + 1) //only on one year set 

    createUserFunctionDto.dateEnd = end;

    // console.log( "createUserFunctionDto " + createUserFunctionDto)
    return await this.userFunctionsRepository.save(createUserFunctionDto);
  }
  //user functions---------------------------------------------------------------
}


