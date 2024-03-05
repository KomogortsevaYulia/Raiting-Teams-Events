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
import { Permissions } from '../shared/permissions';

@ApiTags('forms') // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @SetMetadata('permissions', [Permissions.CAN_CREATE_QUESTIONNAIRES])
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую анкету' })
  async create(@Body() createFormDto: CreateFormDto) {
    await this.formsService.createForm(createFormDto);
    return { message: 'Сохранено' };
  }

  // @Put(':id')
  // @ApiOperation({ summary: "Обновить анекту" })
  // update(@Param("id") idForm, @Body() updateFormDto: UpdateFormDto) {
  //   return this.formsService.updateForm(idForm, updateFormDto);
  // }

  @Post('field')
  @UseGuards(LocalAuthGuard)
  @SetMetadata('permissions', [Permissions.CAN_CREATE_QUESTIONNAIRES])
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новый вопрос' })
  async createFormField(@Body() createFormFieldsDto: CreateFormFieldsDto) {
    await this.formsService.createFormField(createFormFieldsDto);
    return { message: 'Сохранено' };
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
  @SetMetadata('permissions', [Permissions.CAN_CREATE_QUESTIONNAIRES])
  @ApiOperation({ summary: 'Обновить поле' })
  async updateFormField(
    @Param('id') field_id: number,
    @Body() updateFieldDto: UpdateFieldDto,
  ) {
    await this.formsService.updateFormField(field_id, updateFieldDto);
    return { message: 'Сохранено' };
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
