import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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

  @Get()
  @ApiOperation({ summary: "Получение списка мероприятий с учетом различных параметров" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAllEvents(@Query() { id = null, type = null, level = null,
    direction = null, dateStart = null, dateEnd = null }) {

    //  console.log('"id ' + id)
    let dStart: Date = dateStart == null ? null : (new Date(dateStart))
    let dEnd: Date = dateEnd == null ? null : (new Date(dateEnd))

    return this.eventsService.findAllEvents(id, type, level, direction, dStart, dEnd);
  }



  @Post()
  @ApiOperation({ summary: "Создать новое мероприятие" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  create(@Body() createEventDto: CreateEventDto) {
    // console.log(createTeamDto)
    return this.eventsService.create(createEventDto);
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
