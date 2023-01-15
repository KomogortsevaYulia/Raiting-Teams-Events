import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Team } from './entities/team.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { UsersService } from '../users/users.service';
import { ReassignLeaderTeamDto } from './dto/reassign-leader-team';

@ApiTags('teams')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService,
    private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: "Получение списка коллективов с их руководителями" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Team] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll() {
    return this.teamsService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
  //   return this.teamsService.update(+id, updateTeamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamsService.remove(+id);
  // }


  @Get('directions')
  @ApiOperation({ summary: "отдает список направлений с юзерами которые за них отвечают" })
  @ApiParam({ name: "directions", required: true, description: "Идентификатор " })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Team })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  directionsAndUsers() {
    return this.teamsService.findDirections()
  }


  @Post('reassignLeader')
  @ApiOperation({ summary: "Переназначить лидера или, если нету, то назначить нового" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiBody({description:"team:id команды, userId: id юзера"})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  reassignLeader(@Body() reassignLeaderTeamDto: ReassignLeaderTeamDto) {
    return this.teamsService.reassignLeader(reassignLeaderTeamDto)
  }

  @Get(':id/users')
  @ApiOperation({ summary: "Получение участников коллектива по id коллектива" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: UserFunction })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  teamWithUsers(@Param('id') id: number) {
    return this.teamsService.teamWithUsers(id)
  }

  @Get(':id')
  @ApiOperation({ summary: "Получение коллектива по id" })
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



}
