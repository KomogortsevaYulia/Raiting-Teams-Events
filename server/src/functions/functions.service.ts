import { Injectable } from '@nestjs/common';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { SECRET } from '../config';
import * as argon2 from 'argon2';
import { validate } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const jwt = require('jsonwebtoken');

@Injectable()
export class FunctionsService {
  constructor(
    @InjectRepository(Function)  // user //,
    private readonly functionsRepository: Repository<Function>,
   
  ) { }
  create(createFunctionDto: CreateFunctionDto) {
    return 'This action adds a new function';
  }

  findAll() {
    return `This action returns all functions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} function`;
  }

  // async update(updateFunctionDto: UpdateFunctionDto,id: number){
  //   console.log(updateFunctionDto);
  //   return this.functionsRepository.update(updateFunctionDto,+id);
  // }

  remove(id: number) {
    return `This action removes a #${id} function`;
  }
}
