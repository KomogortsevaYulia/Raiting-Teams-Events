import { Injectable } from '@nestjs/common';
import { Dictionary } from './entities/dictionary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class GeneralService {
  constructor(
    @InjectRepository(Dictionary)  // user //,
    private readonly eventsRepository: Repository<Dictionary>,
  ) { }

  findAll(class_name: string = null, class_id: number = null) {

    // find by name
    let options: FindManyOptions<Dictionary> = {}

    if (class_name != null) { //find by class name
      options = { where: { class_name: class_name } }
    } else if (class_id != null) { //find by class id
      options = { where: { class_id: class_id } }
    }

    return this.eventsRepository.find(options);
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
