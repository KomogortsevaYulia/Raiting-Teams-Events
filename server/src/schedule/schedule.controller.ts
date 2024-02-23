import {
  Body,
  Controller,
  Get,
  HttpStatus, Post,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchVisitsDto } from './dto/search-visits.dto';
import {UpdateVisitsDto} from "./dto/update-visits.dto";
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('visits')
  @ApiOperation({ summary: 'Получение посещаемости по id коллектива' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findVisitsTeam(@Query() searchVisitsDto: SearchVisitsDto) {
    return this.scheduleService.findVisits(searchVisitsDto);
  }

  @Post('visits')
  @ApiOperation({ summary: 'Обновление посещаемости по id коллектива и юзера' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateOneVisit(@Body() updateVisitsDto: UpdateVisitsDto) {
    return this.scheduleService.updateVisit(updateVisitsDto);
  }
}
