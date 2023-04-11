import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity'
import { Level, Type } from './enums/enums';
import { Direction } from 'readline';
import { Journal } from './entities/journal.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)  // user //,
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Journal) 
    private readonly journalsRepository: Repository<Journal>,
  ) { }

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAllExternal(): Promise<Event[]> {
    return this.eventsRepository
      .createQueryBuilder("events")
      .orderBy("events.dateStart")
      .where("events.type = :type", { type: "Внешнее" })
      .getMany()
  }


  // конструктор запроса для получения мероприятия по нужным параметрам
  //если параметр был выбран, то добавляем его в запрос (И)
  findAllEvents(type: Type = null, level: Level = Level.UNIVERSITY,
    direction: Direction = null, dateStart: Date = null, dateEnd: Date = null): Promise<Event[]> {

    //dateStart = new Date()
    // if (dateStart != null && dateEnd!=null)
    //   console.log("dateStart: " + (dateStart.toISOString()) + "  dateEnd: " + (dateEnd.toISOString()))

    let buildQuery = this.eventsRepository
      .createQueryBuilder("events")

    // event type
    buildQuery = type != null ? buildQuery
      .andWhere("events.type = :type", { type: type }) : buildQuery

    // event level
    buildQuery = level != null ? buildQuery
      .andWhere("events.level = :level", { level: level }) : buildQuery

    // event direction
    buildQuery = direction != null ? buildQuery
      .andWhere("events.direction = :direction", { direction: direction }) : buildQuery

    // event dateStart
    buildQuery = dateStart != null ? buildQuery
      .andWhere("events.dateStart >= :dateStart", { dateStart: dateStart }) : buildQuery

    // event dateEnd
    buildQuery = dateEnd != null ? buildQuery
      .andWhere("events.dateEnd <= :dateEnd", { dateEnd: dateEnd }) : buildQuery

    return buildQuery.getMany()
  }

  findOne(id: number) {
    return this.eventsRepository.findOneBy({ id: id });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }


  
  findAllJournals(team:number = -1): Promise<Journal[]> {

    let buildQuery = this.journalsRepository
    .createQueryBuilder("journals")
    .leftJoin("journals.team", "team")
    .addSelect("team.id")
    .leftJoin("journals.event", "event")
    .addSelect("event.id")

    buildQuery = team > 0 ? buildQuery
      .andWhere("journals.team_id = :team", { team: team }) : buildQuery

    return buildQuery.getMany()
  }
  
}


