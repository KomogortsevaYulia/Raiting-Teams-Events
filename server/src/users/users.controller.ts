import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  HttpStatus,
  Query,
  UsePipes,
  UnauthorizedException,
  UseGuards,
  Session,
  HttpCode,
  Put,
  SetMetadata,
  Res,
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

@ApiTags('users') // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('bitrix-auth')
  async authBitrix(@Query('code') code: string, @Res() res, @Request() req) {
    try {
      const user = await this.usersService.loginBitrix(code);
      if (user) {
        req.session.user_id = user.id;
        req.session.logged = true;
        return user;
      } else {
        throw new UnauthorizedException('Ошибка авторизации');
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiParam({
    name: 'limit',
    required: false,
    description: 'ограничить число получаемых записей',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findAll(@Query() params: any) {
    const limit: number = params.limit;
    const fullname: string = params.fullname;
    const email: string = params.email;

    // console.log(" email " + params.fullname)
    let users: User[] = null;
    if (fullname || email) {
      // console.log("name")
      users = await this.usersService.findByName(limit, fullname, email);
    } else {
      // console.log("findAll")
      users = await this.usersService.findAllWithLimit(limit);
    }
    return users;
  }

  // @Get('id/:id')
  // @ApiOperation({ summary: "Получение пользователя" })
  // @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // async findOne(@Param('id') id: string) {
  //   //пытается выполниться, при вызове метода checkLogin????
  //   return this.usersService.findOneWithFunction(+id);
  // }

  @UseGuards(LocalAuthGuard)
  @Get('/check-login')
  async checkLogin(@Request() req): Promise<any> {
    // console.log(req.session);
    const user = await this.usersService.findById(req.session.user_id);
    const { password, ...res } = user;
    return res;
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const userData = new CreateUserDto();
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
    return;
  }

  // function--------------------------------------------------------------------

  @Post('functions')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['can create team roles'])
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
  @SetMetadata('permissions', ['can create team roles'])
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
  @SetMetadata('permissions', ['can create team roles'])
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
  @SetMetadata('permissions', ['can create team roles'])
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
  @SetMetadata('permissions', ['can create team roles'])
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

  @Post('user-functions/new-participant')
  @UseGuards(LocalAuthGuard, PermissionsGuard)
  @SetMetadata('permissions', ['can edit status requisitions'])
  @ApiOperation({ summary: 'создать нового учатстника коллектива' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: UserFunction,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async assignRole(@Body() userFDto: UserFunctionDto) {
    return await this.usersService.assignRole(
      userFDto.team,
      userFDto.user,
      'Участник',
    );
  }
  //user functions---------------------------------------------------------------
}
