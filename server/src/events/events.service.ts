import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { Event } from './entities/event.entity'
import { Level, Type } from './enums/enums';
import { Direction } from 'readline';
import { Journal } from './entities/journal.entity';
import { fail } from 'assert';

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

  findTitle(title: string){

    return this.eventsRepository
    
      .createQueryBuilder("events")
      .select(["events.title", "events.images", "events.tags" , "events.description", "events.dateStart"])
      .where("events.title like :title" , { title: `%${title}%`})
      .getMany()
   
  }

  findTags(tags: string){

    return this.eventsRepository
    
      .createQueryBuilder("events")
      .select(["events.title", "events.images", "events.tags" , "events.description", "events.dateStart"])
      .where("events.tags like :tags" , { tags: `%${tags}%`})

   
  }





  // конструктор запроса для получения мероприятия по нужным параметрам
  //если параметр был выбран, то добавляем его в запрос (И)
  findAllEvents(id: number = null, type: number = null, level: number = null,
    direction: number = null, dateStart: Date = null, dateEnd: Date = null, title: string = null,
    tags: string[] = null): Promise<[Event[], number]> {

    //dateStart = new Date()
    // if (dateStart != null && dateEnd!=null)
    //   console.log("dateStart: " + (dateStart.toISOString()) + "  dateEnd: " + (dateEnd.toISOString()))

    let buildQuery = this.eventsRepository
      .createQueryBuilder("events")
      .leftJoinAndSelect("events.level", "level")
      .leftJoinAndSelect("events.type", "type")
      .leftJoinAndSelect("events.direction", "direction")

    //id 
    buildQuery = id  != null ? buildQuery
      .andWhere("events.id = :id", { id: id }) : buildQuery

    //title 
    buildQuery = title != null ? buildQuery
      .andWhere("events.title like :title" , { title: `%${title}%`}) : buildQuery

    //tag 
    buildQuery = tags != null ? buildQuery
     .andWhere("events.tag = :tag" , { tag: tags}) : buildQuery

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
    return this.eventsRepository.findOne({ where: {id: id},relations:{level:true, type:true, direction:true} });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }




  // journals-------------------------------------------------------------------------


  getEventUsers(id: number){
    
    return this.journalsRepository
    
      .createQueryBuilder("journals")
      .where("journals.event_id = :event_id" , { event_id: id})
      .andWhere("journals.is_registered = true")
      .leftJoin("journals.user", "users")
      .addSelect("users.id")
      .leftJoin("journals.team", "teams")
      .addSelect("teams.id")
      .leftJoin("journals.event", "events")
      .addSelect(["events.title", "events.id"])
      .getMany()
   
  }

  async findAllJournals(event_id: number = null, title: string = null): Promise<[Journal[], number]> {

    let buildQuery = this.journalsRepository
      .createQueryBuilder("journals")
      .leftJoin("journals.user", "users")
      .addSelect("users.id")
      .leftJoin("journals.team", "teams")
      .addSelect("teams.id")
      .leftJoin("journals.event", "events")
      .addSelect(["events.title", "events.id"])
      // .where("events.title like :title", {title: `%${title}%`})
    

      buildQuery = title != null ? buildQuery

      .where("events.title like :title", { title: `%${title}%` }) 
      .andWhere("journals.is_registered = true") : buildQuery
    



      //id 
    buildQuery = event_id != null ? buildQuery

      .andWhere("journals.event_id = :event_id", { event_id: event_id }) 
      .andWhere("journals.is_registered = true") : buildQuery

    //     //title 
    // buildQuery = title != null ? buildQuery
    //   .andWhere("events.title like :title" , { title: `%${title}%`}) : buildQuery
   
    // buildQuery = team != null ? buildQuery
    //   .where("journals.team_id = :team", { team: team }) : buildQuery

    return buildQuery.getManyAndCount()
  }

  async findAllJournalByUserId(id: number) {
    let buildQuery = this.journalsRepository
        .createQueryBuilder("journals")
        .leftJoin("journals.team", "team")
        .addSelect("team")
        .leftJoin("journals.event", "event")
        .addSelect("event")
    buildQuery = id !=null ? buildQuery
        .andWhere("journals.user_id = :id", { id:id}) : buildQuery
    return buildQuery.getManyAndCount()
  }

  // journals-------------------------------------------------------------------------

  
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
    let data = await this.findJournals(teamId)
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


  async createJournal(createJournalDto: CreateJournalDto): Promise<Journal> {

    let journal = await this.journalsRepository.save({
      ...createJournalDto,
      // image: [],
      // tags: [],
      // type_team: "teams",
      // creation_date: new Date()
    })
    console.log(journal)
    return journal;
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

  async updateJournal( event_id: number, user_id: number) {

    
   return await this.journalsRepository
    .createQueryBuilder("journals")
    .update()
    .set({ is_registered: true})
    .where("journals.event_id = :event_id", {event_id: event_id})
    .andWhere("journals.user_id = :user_id", {user_id: user_id})
    .execute()
    
  }


  async deleteJournal(event_id: number, user_id: number) {

    return await this.journalsRepository
      .createQueryBuilder("journals")
      .delete()
      .where("journals.event_id = :event_id", {event_id: event_id})
      .andWhere("journals.user_id = :user_id", {user_id: user_id})
      .execute()

  } 
}


