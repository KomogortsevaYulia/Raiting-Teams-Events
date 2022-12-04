import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  create(createUserDto: CreateUserDto) : Promise<User>{
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

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
     return this.userFunctionsRepository
    .createQueryBuilder("users")
    .innerJoin("users.user_function", "user_function")
    // .addSelect("user_functions")
    // .innerJoin("users_functions.functions", "functions")
    // .addSelect("functions")
    // .innerJoinAndSelect("functions.teams", "teams")
    // .addSelect("teams") 
    .getMany()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }


}


