import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Team } from './entities/team.entity';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';

@ApiTags('teams')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

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



 //по ид команды найти всех юзеров
 @Get(':id/users')
 @ApiOperation({ summary: "Получение пользователей по id коллектива" })
 @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
 @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: UserFunction })
 @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
 teamsAndUsers(@Param('id') id: number) {
   return this.teamsService.teamWithUsers(id)
 }

  @Get(':id')
  @ApiOperation({ summary: "Получение коллектива" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findOne(@Param('id') id: number) {
    return this.teamsService.findOne(id);
  }

  @Get(':id/functions')
  @ApiOperation({ summary: "Получение списка должностей в коллективе" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  teamsFunctions(@Param('id') id: number) {
    return this.teamsService.teamsFunctions(id)
  }

  
  @Post()
  @ApiOperation({ summary: "Создать новый коллектив (ответственный по направлению)" })
  @ApiBody({description:"название коллектива, ФИО руководителя, описание проекта",required:true})
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно"})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  create( leaderId:number, @Body() createTeamDto: CreateTeamDto) {
    console.log(leaderId)
    return this.teamsService.create(createTeamDto, leaderId);
  }
  
  // @Get('directions')
  // @ApiOperation({ summary: "отдает список направлений с юзерами которые за них отвечают" })
  // @ApiParam({ name: "directions", required: true, description: "Идентификатор " })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Team })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // directionsAndUsers() {
  //   return this.teamsService.directionsAndUsers()
  // }

}
