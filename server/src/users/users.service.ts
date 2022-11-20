import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)  // user //,
    private readonly usersRepository: Repository<User>,
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
    return this.usersRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}


