import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {  ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('events')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // @Post()
  // create(@Body() createEventDto: CreateEventDto) {
  //   return this.eventsService.create(createEventDto);
  // }

  @Get()
  @ApiOperation({ summary: "Получение списка мероприятий" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Event] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll() {
    return this.eventsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
  //   return this.eventsService.update(+id, updateEventDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventsService.remove(+id);
  // }
}
