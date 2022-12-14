import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {Event} from './entities/event.entity'

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)  // user //,
    private readonly eventsRepository: Repository<Event>,
  ) { }

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll(): Promise<Event[]> {
    return this.eventsRepository
      .createQueryBuilder("events")
      .orderBy("events.dateStart")
      .getMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
