import { Injectable } from '@nestjs/common';
import { Dictionary } from './entities/dictionary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictionaryDto } from './dto/dictionary.dto';

@Injectable()
export class GeneralService {
  constructor(
    @InjectRepository(Dictionary) // user //,
    private readonly dictionaryRepository: Repository<Dictionary>,
  ) {}

  async findAll(dictDto: DictionaryDto) {
    let query = this.dictionaryRepository.createQueryBuilder('dictionary');
    // class_name
    query = dictDto.class_name
      ? query.andWhere('dictionary.class_name = :class_name', {
          class_name: dictDto.class_name,
        })
      : query;
    // name
    query = dictDto.name
      ? query.andWhere('dictionary.name = :name', { name: dictDto.name })
      : query;
    // class_id
    query = dictDto.class_id
      ? query.andWhere('dictionary.class_id = :class_id', {
          class_id: dictDto.class_id,
        })
      : query;

    return await query.getMany();
  }

  findOne(id: number) {
    return this.dictionaryRepository.findOneBy({ id: id });
  }
}
