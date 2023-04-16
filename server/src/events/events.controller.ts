import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Event } from './entities/event.entity';
import { Direction, Level } from './enums/enums';
import { Type } from 'class-transformer';

@ApiTags('events')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  // @Post()
  // create(@Body() createEventDto: CreateEventDto) {
  //   return this.eventsService.create(createEventDto);
  // }

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
  findAllEvents(@Query() { type = null, level = null,
    direction = null, dateStart = null, dateEnd = null }) {

     // console.log( dateStart==null ? null : (new Date(dateStart)).toISOString())
    let dStart: Date = dateStart==null ? null : (new Date(dateStart))
    let dEnd: Date = dateEnd==null ? null : (new Date(dateEnd))

    return this.eventsService.findAllEvents(type, level, direction, dStart, dEnd);
  }

  
  @Get('/external/:id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Get('journal')
  @ApiOperation({ summary: "Получение списка мероприятий из журнала" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAllJournals(@Query() params) {
    return this.eventsService.findAllJournals(params.team_id);
  }

  @ApiOperation({ summary: "Получение мероприятия" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @Get('/:id')
  find(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
  //   return this.eventsService.update(+id, updateEventDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventsService.remove(+id);
  // }
}
