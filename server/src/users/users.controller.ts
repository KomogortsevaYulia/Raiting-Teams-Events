
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UsePipes,Query, Put } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { UserRO } from './user.interface';

import { CreateFunctionDto } from './dto/create-functions.dto';
import { CreateUserFunctionDto } from './dto/create-user-function.dto';
import { UserFunction } from './entities/user_function.entity';
import { UpdateFunctionDto } from './dto/update-functions.dto';


@ApiTags('users')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  @ApiOperation({ summary: "Получение списка пользователей" })
  @ApiParam({ name: "limit", required: false, description: "ограничить число получаемых записей" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll(@Query() params: any) {

    let limit:number = params.limit
    let fullname:string = params.fullname
    let email:string = params.email

    let users
    if(fullname || email){
      users = this.usersService.findByName(limit, fullname, email);
    }else{
      users = this.usersService.findAll(limit);
    }
    return users
  }

  @Get(':id')
  @ApiOperation({ summary: "Получение пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findOne(@Param('id') id: string) {
    return this.usersService.findOneWithFunction(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }


  // @Get('users_func/:id')
  // @ApiOperation({ summary: "Получение пользователя" })
  // @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // users_func(@Param('id') id: number) {
  //   return this.usersService.users_func(id);
  // }


  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя"})
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async create(@Body('user') userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.usersService.login(loginUserDto);

    const errors = {User: ' not found'};
    if (!_user) throw new HttpException({errors}, 401);

    const token = await this.usersService.generateJWT(_user);
    const {email, id,studnumber, fullname} = _user;
    const user = {email, token, id, studnumber, fullname};
    return {user}
  }








  

  // function--------------------------------------------------------------------


  @Post('functions')
  @ApiOperation({ summary: "Создать функцию для пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  createFunction(@Body() createFunctionDto: CreateFunctionDto) {
    return this.usersService.createFunction(createFunctionDto);
  }


  @Get('functions/team_id')
  @ApiOperation({ summary: "найти функцию по ид команды" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findFunctionByTeamId(@Query() params: any) {
    // console.log(teamId)
    return this.usersService.findFunctionByTeamId(params.id);
  }


  @Put('functions')
  @ApiOperation({ summary: "обновить функуию" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  updateFunction(@Body() updateFunctionDto: UpdateFunctionDto) {
    // console.log(teamId)
    return this.usersService.updateFunction(updateFunctionDto);
  }

  // function--------------------------------------------------------------------









  //user functions---------------------------------------------------------------
  @Post('userFunctions')
  @ApiOperation({ summary: "Создать функцию userFunctions" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: UserFunction })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  createUserFunction(@Body() createUserFunctionDto: CreateUserFunctionDto) {
    return this.usersService.createUserFunction(createUserFunctionDto);
  }



  //user functions---------------------------------------------------------------

}
