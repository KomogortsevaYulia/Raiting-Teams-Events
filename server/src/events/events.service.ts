import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity'
import { Type } from './enums/enums';
import { Journal } from './entities/journal.entity';

@Injectable()
export class EventsService {
  constructor(
      @InjectRepository(Event)  // user //,
      private readonly eventsRepository: Repository<Event>,
      @InjectRepository(Journal)
      private readonly journalsRepository: Repository<Journal>,
  ) { }



  findAllExternal(): Promise<Event[]> {

    return this.eventsRepository
        .createQueryBuilder("events")
        .orderBy("events.dateStart")
        .leftJoinAndSelect("events.type", "type")
        .where("type.id = :type", { type: Type.OUTSIDE })
        .getMany()
  }


  // конструктор запроса для получения мероприятия по нужным параметрам
  //если параметр был выбран, то добавляем его в запрос (И)
  findAllEvents(id: number = null, type: number = null, level: number = null,
    direction: number = null, dateStart: Date = null, dateEnd: Date = null): Promise<[Event[], number]> {

    let buildQuery = this.eventsRepository
        .createQueryBuilder("events")
        .leftJoinAndSelect("events.level", "level")
        .leftJoinAndSelect("events.type", "type")
        .leftJoinAndSelect("events.direction", "direction")

    //id 
    buildQuery = id != null ? buildQuery
      .andWhere("events.id = :id", { id: id }) : buildQuery

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

    return buildQuery.getManyAndCount()
  }

  findOne(id: number) {
    return this.eventsRepository.findOne({ where: { id: id }, relations: { level: true, type: true, direction: true } });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }




  // journals-------------------------------------------------------------------------

  findAllJournals(team: number = null): Promise<[Journal[], number]> {

    let buildQuery = this.journalsRepository
        .createQueryBuilder("journals")
        .leftJoin("journals.team", "team")
        .addSelect("team.id")
        .leftJoin("journals.event", "event")
        .addSelect("event.id")

   
    buildQuery = team != null ? buildQuery
      .where("journals.team_id = :team", { team: team }) : buildQuery

    return buildQuery.getManyAndCount()
  }

  
  findJournals(team: number = null): Promise<[Journal[], number]> {


    let buildQuery = this.journalsRepository
      .createQueryBuilder("journals")
      .leftJoin("journals.team", "team")
      .addSelect("team.id")
      .leftJoin("journals.event", "event")
      .addSelect("event.id")

   
    buildQuery = team != null ? buildQuery
      .where("journals.team_id = :team", { team: team }) : buildQuery

    return buildQuery.getManyAndCount()
  }


  // journals-------------------------------------------------------------------------



  async getEventsViaJournalsByTeam(teamId: number, type: number = null, level: number = null,
    dateStart: Date = null, dateEnd: Date = null):Promise<[Event[], number]> {

    
    // alert("teamId " + teamId)
    let data = await this.findAllJournals(teamId)
    let countAppropriate = 0

    //получить всех найденне journal
    let journals = data[0]

    let arrayData:Event[] = []


    for (let i = 0; i < journals.length; i++) {
      let journal = journals[i]


      let eventId = journal.event.id
    
// возвращает данные с кауентером
      let event = (await this.findAllEvents(eventId, type, level,
        null, dateStart, dateEnd))[0]


      if (event !=null && event[0]!=null) {
      //  предполагается несколько данных, но мы знаем, что у нас один будет
        arrayData.push(event[0])
        countAppropriate++
      }
    }

    return [ arrayData, countAppropriate ]

  }


  async create(createEventDto: CreateEventDto): Promise<Event> {

    let event = await this.eventsRepository.save({
      ...createEventDto,
      // image: [],
      // tags: [],
      // type_team: "teams",
      // creation_date: new Date()
    })


    return event;
  }

}




