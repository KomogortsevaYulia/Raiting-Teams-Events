import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Event } from './entities/event.entity';

@ApiTags('events')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Get('/external')
  @ApiOperation({ summary: "Получение списка внешних мероприятий" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll() {
    return this.eventsService.findAllExternal();
  }

  @Get('/tags')
  @ApiOperation({ summary: "Получение списка внешних мероприятий" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findTags(@Query() {tags}) {
    return this.eventsService.findTags(tags);
  }

  @Get('/journals')
  @ApiOperation({ summary: "Получение списка внешних мероприятий" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findJournals(@Query() { event_id = null,  title = null}) {
   
    return this.eventsService.findAllJournals(event_id, title);
  }

  @Get('/journals/getEventUsers/:id')
  @ApiOperation({ summary: "Получение списка внешних мероприятий" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  getEventUsers(@Param('id') id: string) {
   
    return this.eventsService.getEventUsers(+id);
  }



  @Get()
  @ApiOperation({ summary: "Получение списка мероприятий с учетом различных параметров" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAllEvents(@Query() { id = null, type = null, level = null,
    direction = null, dateStart = null, dateEnd = null , title = null},
    tags = null) {

    let dStart: Date = dateStart == null ? null : (new Date(dateStart))
    let dEnd: Date = dateEnd == null ? null : (new Date(dateEnd))

    return this.eventsService.findAllEvents(id, type, level, direction, dStart, dEnd, title, tags);
  }



  @Post()
  @ApiOperation({ summary: "Создать новое мероприятие" })
  @ApiBody({ description: "название коллектива, ФИО руководителя, описание проекта", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  create(@Body() createEventDto: CreateEventDto) {
      console.log(createEventDto)
    return this.eventsService.create(createEventDto);
  }

  @Post("/journal/add")
  @ApiOperation({ summary: "Создать новое мероприятие" })
  @ApiBody({ description: "название коллектива, ФИО руководителя, описание проекта", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  createJournal(@Body() createJournal: CreateJournalDto) {
      console.log(createJournal)
    return this.eventsService.createJournal(createJournal);
  }

  @Patch("/journal/isParticipation/")
  @ApiOperation({ summary: "333" })
  @ApiBody({ description: "333", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  async updateJournal(@Query() { user_id, event_id}){
    return this.eventsService.updateJournal(event_id, user_id);
  }


  @Delete("/journal/deleteUser")
  @ApiOperation({ summary: "333" })
  @ApiBody({ description: "333", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  async deleteJournal(@Query() { user_id, event_id}){
    return this.eventsService.deleteJournal(event_id, user_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventsService.findOne(+id);
  // }

  @Get('/external/:id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  // @Get('journal')
  // @ApiOperation({ summary: "Получение списка мероприятий из журнала" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // findAllJournals(@Query() params) {
  //   return this.eventsService.findAllJournals(params.team_id);
  // }

  @ApiOperation({ summary: "Получение мероприятия" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @Get('/:id')
  find(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @ApiOperation({ summary: "Получение мероприятия коллектива по журналу" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @Get('events_of_team/:teamId')
   getEventsViaJournalsByTeam(@Param('teamId') teamId, @Query() { type = null, level = null,
    dateStart = null, dateEnd = null }) {

    let res =  this.eventsService.getEventsViaJournalsByTeam(teamId, type, level, dateStart, dateEnd)

    return res
  }
}
