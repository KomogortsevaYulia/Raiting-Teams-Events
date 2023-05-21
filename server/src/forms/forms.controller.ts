import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormsService } from './forms.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@ApiTags('forms')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  // @Post()
  // create(@Body() createFormDto: CreateFormDto) {
  //   return this.formsService.create(createFormDto);
  // }

  // @Get()
  // findAll() {
  //   return this.formsService.findAll();
  // }

  @Get(':team_id')
  @ApiOperation({ summary: "Получение списка вопросов анкеты по id коллектива" })
  @ApiParam({ name: "team_id", required: true, description: "Идентификатор коллектива" })
  findOnFormFields(@Param('team_id') team_id: number) {
    return this.formsService.findOnFormFields(team_id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
  //   return this.formsService.update(+id, updateFormDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.formsService.remove(+id);
  // }
}
