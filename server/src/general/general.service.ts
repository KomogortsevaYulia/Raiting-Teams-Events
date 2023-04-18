import { Injectable } from '@nestjs/common';
import { Dictionary } from './entities/dictionary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GeneralService {
  constructor(
    @InjectRepository(Dictionary)  // user //,
    private readonly eventsRepository: Repository<Dictionary>,
  ) { }

  findAll() {
    return  this.eventsRepository.find();
  }

  findOne(id: number) {
    return this.eventsRepository.findOneBy({ id: id });
  }

  // update(id: number, updateGeneralDto: UpdateGeneralDto) {
  //   return `This action updates a #${id} general`;
  // }

  remove(id: number) {
    return `This action removes a #${id} general`;
  }
}
