import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateFunctionDto } from './dto/create-functions.dto';
import { CreateUserFunctionDto } from './dto/create-user-function.dto';

@ApiTags('users')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // @Get('users_func/:id')
  // @ApiOperation({ summary: "Получение пользователя" })
  // @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: User })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // users_func(@Param('id') id: number) {
  //   return this.usersService.users_func(id);
  // }



  // users/functions


  @Post('functions')
  createFunction(@Body() createFunctionDto: CreateFunctionDto) {
    // console.log("funct " + createFunctionDto.title)
    return this.usersService.createFunction(createFunctionDto);
  }

  // users/userFunctions

  @Post('userFunctions')
  createUserFunction(@Body() createUserFunctionDto: CreateUserFunctionDto) {
    return this.usersService.createUserFunction(createUserFunctionDto);
  }
}
