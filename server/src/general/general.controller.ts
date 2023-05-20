import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { GeneralService } from './general.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Team } from 'src/teams/entities/team.entity';
import { Dictionary } from './entities/dictionary.entity';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) { }

  // @Post()
  // create(@Body() createGeneralDto: CreateGeneralDto) {
  //   return this.generalService.create(createGeneralDto);
  // }

  // dictionary------------------------------------------------------------------------------


  @Get("dictionary")
  @ApiOperation({ summary: "Получение значений словаря по ид или имени класса" })
  @ApiQuery({ name: "class_name", required: false, description: "указать имя класса" })
  @ApiQuery({ name: "class_id", required: false, description: "указать ид  класса" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Dictionary] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll(@Query() {class_name = null,  class_id = null}) {
    return this.generalService.findAll(class_name, class_id);
  }
  

  @Get('dictionary/:id')
  @ApiOperation({ summary: "Получение значения из словаря по ид записи" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Dictionary] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findOne(@Param('id') id: string) {
    return this.generalService.findOne(+id);
  }

  // dictionary------------------------------------------------------------------------------


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGeneralDto: UpdateGeneralDto) {
  //   return this.generalService.update(+id, updateGeneralDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalService.remove(+id);
  }
}
