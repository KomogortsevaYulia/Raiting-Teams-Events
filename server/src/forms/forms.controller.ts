import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFormDto, CreateFormFieldsDto } from './dto/create-form.dto';
import { UpdateFieldDto } from './dto/update-field';
import { LocalAuthGuard } from '../users/guard/local-auth.guard';

@ApiTags('forms') // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @SetMetadata('permissions', ['can create questionnaires'])
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую анкету' })
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.createForm(createFormDto);
  }

  // @Put(':id')
  // @ApiOperation({ summary: "Обновить анекту" })
  // update(@Param("id") idForm, @Body() updateFormDto: UpdateFormDto) {
  //   return this.formsService.updateForm(idForm, updateFormDto);
  // }

  @Post('field')
  @UseGuards(LocalAuthGuard)
  @SetMetadata('permissions', ['can create questionnaires'])
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новый вопрос' })
  createFormField(@Body() createFormFieldsDto: CreateFormFieldsDto) {
    return this.formsService.createFormField(createFormFieldsDto);
  }
  // @Get()
  // findAll() {
  //   return this.formsService.findAll();
  // }

  @Get(':team_id')
  @ApiOperation({
    summary: 'Получение списка вопросов анкеты по id коллектива',
  })
  @ApiParam({
    name: 'team_id',
    required: true,
    description: 'Идентификатор коллектива',
  })
  findOnFormFields(@Param('team_id') team_id: number) {
    return this.formsService.findOnFormFields(team_id);
  }

  @Get('id/:team_id')
  @ApiOperation({ summary: 'Получение id анкеты по id коллектива' })
  @ApiParam({
    name: 'team_id',
    required: true,
    description: 'Идентификатор коллектива',
  })
  findOnIdForm(@Param('team_id') team_id: number) {
    return this.formsService.findOnIdForm(team_id);
  }

  @Put('field/:id')
  @UseGuards(LocalAuthGuard)
  @SetMetadata('permissions', ['can create questionnaires'])
  @ApiOperation({ summary: 'Обновить поле' })
  updateFormField(
    @Param('id') field_id,
    @Body() updateFieldDto: UpdateFieldDto,
  ) {
    console.log(updateFieldDto);
    return this.formsService.updateFormField(field_id, updateFieldDto);
  }

  @Get('requisition/:id')
  @ApiOperation({ summary: 'получить форму с ответами пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор запроса',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: Function,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async fetchRequisitionForm(@Param('id') req_id: number) {
    return await this.formsService.findRequisitionForm(req_id);
  }
}
