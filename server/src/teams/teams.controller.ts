import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Team } from './entities/team.entity';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';


@ApiTags('teams')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }


  //Получение коллектива
  @Get(':id')
  @ApiOperation({ summary: "Получение коллектива" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findOne(@Param('id') id: number) {
    return this.teamsService.findOne(id);
  }

 //find teams with specific position user
 @Get('user_role/:title_role')
 @ApiOperation({ summary: "Получение коллективов с определенной должностью пользователя" })
 @ApiParam({ name: "title_role", required: true, description: "Идентификатор роли" })
 @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: UserFunction })
 @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
 teamsWithUsersOfSpecificPosition(@Param('title_role') title_role: string) {
   return this.teamsService.teamsWithUsersOfSpecificPosition(title_role)
 }

 //по ид команды найти всех юзеров
 @Get('with_users/:id')
 @ApiOperation({ summary: "Получение пользователей по id коллектива" })
 @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
 @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: UserFunction })
 @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
 teamsAndUsers(@Param('id') id: number) {
   return this.teamsService.teamsAndUsers(id)
 }
}
