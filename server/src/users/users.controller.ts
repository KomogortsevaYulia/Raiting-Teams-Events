import { Controller, Get, Post, Body, Patch, Request, Param, Delete, HttpStatus, UsePipes, UnauthorizedException, UseGuards, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('users')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: "Получение списка пользователей" })
  //@ApiParam({ name: "noteId", required: true, description: "Note identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Получение пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findOne(@Param('id') id: string) {
    return this.usersService.findOneWithFunction(+id);
  }

  @UseGuards(LocalAuthGuard)
  @Get('/getInfoUser')
  async getInfoUser(@Request() req): Promise<any> {
    console.log(req.session)
    const user = await this.usersService.findById(req.session.user_id)
    const { password, ...result } = user;

    return result;
  }

  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Request() req, @Body('user') userData: CreateUserDto) {

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
    const email = req.body.user.email
    const user = await this.usersService.login(email, pass)
    if (user) {
      req.session.user_id = user.id;
      req.session.logged = true;
      return user;
    }
    else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async logout(@Request() req) {
    req.session.logged = false;
    return true;
  }
}
