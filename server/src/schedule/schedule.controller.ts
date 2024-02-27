import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchVisitsDto } from './dto/search-visits.dto';
import { UpdateVisitsDto } from './dto/update-visits.dto';
import { GetAllCabinetsResponse } from './dto/get-all-cabinets.response';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { CreateCabinetResponse } from './dto/create-cabinet.response';
import { DeleteCabinetResponse } from './dto/delete-cabinet.response';

@ApiTags('schedule')
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

  @Get('cabinets')
  @ApiOperation({ summary: 'Получение всех аудиторий' })
  @ApiOkResponse({
    type: GetAllCabinetsResponse,
    status: HttpStatus.OK,
    description: 'Успешно',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  getAllCabinets() {
    return this.scheduleService.getAllCabinets();
  }

  @Post('cabinets')
  @ApiOperation({ summary: 'Создание новой аудитории' })
  @ApiOkResponse({
    type: CreateCabinetResponse,
    status: HttpStatus.OK,
    description: 'Успешно',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  createCabinet(@Body() dto: CreateCabinetDto) {
    return this.scheduleService.createCabinet(dto);
  }

  @Delete('cabinets/:id')
  @ApiOperation({ summary: 'Удаление аудитории' })
  @ApiOkResponse({
    type: DeleteCabinetResponse,
    status: HttpStatus.OK,
    description: 'Успешно',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiQuery({ name: 'id', required: true, type: Number })
  deleteCabinet(@Param('id') id: number) {
    return this.scheduleService.deleteCabinet(id);
  }
}
