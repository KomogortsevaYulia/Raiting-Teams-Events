import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Team } from '../teams/entities/team.entity';
import { SearchVisitsDto } from './dto/search-visits.dto';
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // TODO: create post
  // @Post()
  // create(@Body() createScheduleDto: CreateScheduleDto) {
  //   return this.scheduleService.create(createScheduleDto);
  // }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get('visits')
  @ApiOperation({ summary: 'Получение посещаемости по id коллектива' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно', type: [Team] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Query() searchVisitsDto: SearchVisitsDto) {
    return this.scheduleService.findOne(searchVisitsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
