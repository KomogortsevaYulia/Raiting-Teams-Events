import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateFunctionDto } from './dto/create-functions.dto';
import { CreateUserFunctionDto } from './dto/create-user-function.dto';
import { UserFunction } from './entities/user_function.entity';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserFunctionDto } from './dto/user-functions.dto';
import { PermissionsGuard } from './guard/check-permissions.guard';
import { Permissions } from '../shared/permissions';
import { PermissionsActions } from '../general/enums/action-permissions';

@ApiTags('users') // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('bitrix-auth')
  async authBitrix(@Query('code') code: string, @Request() req) {
    const user = await this.usersService.loginBitrix(code);

    if (user) {
      req.session.user_id = user.id;
      req.session.logged = true;
    } else {
      throw new UnauthorizedException();
    }

    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findAll(@Query() params: any) {
    const limit: number = params.limit;
    const offset: number = params.offset;
    const searchTxt: string = params.searchTxt;

    return await this.usersService.findUser(limit, offset, searchTxt);
  }

  @UseGuards(LocalAuthGuard)
  @Get('/check-login')
  async checkLogin(@Request() req): Promise<any> {
    const user = await this.usersService.findById(req.session.user_id);
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { password, ...res } = user;
    return res;
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.update(req.body, +id);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор пользователя',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Request() req) {
    const userData = new CreateUserDto();
    userData.username = req.body.user.username;
    userData.password = req.body.user.password;
    userData.email = req.body.user.email;
    const user = await this.usersService.create(userData);
    if (user) {
      req.session.user_id = user.id;
      req.session.logged = true;
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(@Request() req) {
    const pass = req.body.user.password;
    const username = req.body.user.username;
    const user = await this.usersService.login(username, pass);
    if (user) {
      req.session.user_id = user.id;
      req.session.logged = true;
      return user;
    } else {
      throw new UnauthorizedException('Неверное имя пользователя или пароль');
    }
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async logout(@Request() req) {
    req.session.logged = false;
  }

  // only for admin
  @Post('permissions')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', [Permissions.CAN_ALL])
  @ApiOperation({ summary: 'Изменить разрешения пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You are not admin',
  })
  async changePermissions(
    @Body() params: { userId: number; permissions: Permissions[] },
  ) {
    const user = new User();
    user.userId = params.userId;
    return await this.usersService.changePermissions(
      user,
      params.permissions,
      PermissionsActions.REPLACE,
    );
  }

  // function--------------------------------------------------------------------

  @Post('functions')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', [Permissions.CAN_CREATE_TEAM_ROLES])
  @ApiOperation({ summary: 'Создать функцию для пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: Function,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  createFunction(@Body() createFunctionDto: CreateFunctionDto) {
    return this.usersService.createFunctionIfNotExist(createFunctionDto);
  }

  @Put('functions/:id')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', [Permissions.CAN_CREATE_TEAM_ROLES])
  @ApiOperation({ summary: 'Обновить функцию для пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: Function,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateFunction(
    @Param('id') idFunction,
    @Body() createFunctionDto: CreateFunctionDto,
  ) {
    return this.usersService.updateFunction(idFunction, createFunctionDto);
  }

  @Get('functions/:id')
  @ApiOperation({
    summary: 'Получить список коллективов в которых состоит пользователь',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: Function,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOneWithFunction(@Param('id') id: number) {
    return this.usersService.findOneWithFunction(id);
  }

  // function--------------------------------------------------------------------

  @Delete('team/:id_team/user/:id_user')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', [Permissions.CAN_CREATE_TEAM_ROLES])
  @ApiOperation({ summary: 'Удалить роль юзера из коллектива' })
  @ApiParam({ name: 'id_team', required: true, description: 'ид коллектива' })
  @ApiParam({ name: 'id_leader', required: true, description: 'ид user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: Function,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async removeUserFunction(
    @Param('id_user') idUser: number,
    @Param('id_team') idTeam: number,
  ) {
    const uFDto = new UserFunctionDto();
    uFDto.user = idUser;
    uFDto.team = idTeam;

    const uFs = await this.usersService.findUserFunctions(uFDto);

    uFs.forEach(async (uF) => {
      await this.usersService.removeUserFunction(uF.id);
    });

    return true;
  }

  //user functions---------------------------------------------------------------
  @Post('userFunctions')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', [Permissions.CAN_CREATE_TEAM_ROLES])
  @ApiOperation({ summary: 'Создать функцию userFunctions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: UserFunction,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  createUserFunction(@Body() createUserFunctionDto: CreateUserFunctionDto) {
    return this.usersService.createUserFunctionOrUpdate(createUserFunctionDto);
  }

  @Delete('user-functions/:id')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', [Permissions.CAN_CREATE_TEAM_ROLES])
  @ApiOperation({ summary: 'Удалить функцию userFunctions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: UserFunction,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  deleteUserFunction(@Param('id') id: number) {
    return this.usersService.removeUserFunction(id);
  }

  @Get('user-functions')
  @ApiOperation({ summary: 'Получить userFunctions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: UserFunction,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findUserFunctions(@Query() userFDto: UserFunctionDto) {
    return this.usersService.findUserFunctions(userFDto);
  }

  //user functions---------------------------------------------------------------

  @Get(':id')
  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }
}
