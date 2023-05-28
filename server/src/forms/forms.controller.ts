import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { FormsService } from './forms.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createFormDto } from './dto/create-form.dto';
import { createFormFieldsDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@ApiTags('forms')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @UsePipes(new ValidationPipe)
  @ApiOperation({ summary: "Создать новую анкету" })
  create(@Body() createFormDto: createFormDto) {
    return this.formsService.createForm(createFormDto);
  }

  
  @Put(':id')
  @ApiOperation({ summary: "Обновить анекту" })
  update(@Param("id") idForm, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.updateForm(idForm, updateFormDto);
  }
  
  @Post('field')
  @UsePipes(new ValidationPipe)
  @ApiOperation({ summary: "Создать новый вопрос" })
  createFormField(@Body() createFormFieldsDto: createFormFieldsDto) {
    return this.formsService.createFormField(createFormFieldsDto);
  }
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

  @Get('id/:team_id')
  @ApiOperation({ summary: "Получение id анкеты по id коллектива" })
  @ApiParam({ name: "team_id", required: true, description: "Идентификатор коллектива" })
  findOnIdForm(@Param('team_id') team_id: number) {
    return this.formsService.findOnIdForm(team_id);
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
