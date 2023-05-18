
import { Controller, Get, Post, Body, Patch, Request, Param, Delete, HttpStatus, Query, UsePipes, UnauthorizedException, UseGuards, Session, HttpCode, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateFunctionDto } from './dto/create-functions.dto';
import { CreateUserFunctionDto } from './dto/create-user-function.dto';
import { UserFunction } from './entities/user_function.entity';
import { LocalAuthGuard } from './local-auth.guard';


@ApiTags('users')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: "Получение списка пользователей" })
  @ApiParam({ name: "limit", required: false, description: "ограничить число получаемых записей" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async findAll(@Query() params: any) {

    let limit: number = params.limit
    let fullname: string = params.fullname
    let email: string = params.email

    // console.log(" email " + params.fullname) 
    let users:User[] = null
    if (fullname || email) {
      // console.log("name")
      users = await this.usersService.findByName(limit, fullname, email);
    } else {
      // console.log("findAll")
      users =await this.usersService.findAllWithLimit(limit);
    }
    return users
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
    const user = await this.usersService.findById(req.session.user_id)
    let { password, ...res } = user;
    return res;
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Request() req) {
    const userData = new CreateUserDto();
    userData.username = req.body.user.username;
    userData.password = req.body.user.password;
    userData.email = req.body.user.email;
    const user = await this.usersService.create(userData)
    if (user) {
      req.session.user_id = user.id;
      req.session.logged = true;
      return user;
    }
    else {
      throw new UnauthorizedException();
    }

  }

  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(@Request() req) {
    const pass = req.body.user.password
    const username = req.body.user.username
    const user = await this.usersService.login(username, pass)
    if (user) {
      req.session.user_id = user.id;
      req.session.logged = true;
      return user;
    }
    else {
      throw new UnauthorizedException();
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
  @ApiOperation({ summary: "Создать функцию для пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  createFunction(@Body() createFunctionDto: CreateFunctionDto) {
    return this.usersService.createFunction(createFunctionDto);
  }

  @Put('functions/:id')
  @ApiOperation({ summary: "Обновить функцию для пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  updateFunction(@Param("id") idFunction, @Body() createFunctionDto: CreateFunctionDto) {
    return this.usersService.updateFunction(idFunction, createFunctionDto);
  }

  @Get('functions/:id')
  @ApiOperation({ summary: "Получить список коллективов в которых состоит пользователь" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findOneWithFunction(@Param("id") id:number){
    return this.usersService.findOneWithFunction(id);
  }
  // function--------------------------------------------------------------------

  @Delete('team/:id_team/leader/:id_leader')
  @ApiOperation({ summary: "Удалить лидера коллектива" })
  @ApiParam({ name: "id_team", required: true, description: "ид коллектива" })
  @ApiParam({ name: "id_leader", required: true, description: "ид лидера" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  removeLeader(@Param('id_leader') idLeader: number,@Param('id_team') idTeam: number) {
    return this.usersService.removeLeader(idTeam,idLeader)
  }

  //user functions---------------------------------------------------------------
  @Post('userFunctions')
  @ApiOperation({ summary: "Создать функцию userFunctions" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: UserFunction })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  createUserFunction(@Body() createUserFunctionDto: CreateUserFunctionDto) {
    return this.usersService.createUserFunction(createUserFunctionDto);
  }
  //user functions---------------------------------------------------------------


  //user events---------------------------------------------------------------
  @Get('event/:id')
  @ApiOperation({ summary: "Получить список мероприятий на которые зарегистрировался пользователь" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  getEvents(@Param("id") id:number){
    return
  }
}
