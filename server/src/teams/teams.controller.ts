import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Team } from './entities/team.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { UsersService } from '../users/users.service';

import { UpdateUserDto } from 'src/users/dto/update-user.dto';

import { UpdateTeamDto } from './dto/update-team.dto';
import { UploadsService } from 'src/uploads/uploads.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


@ApiTags('teams')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
    private readonly uploadsService: UploadsService) { }


  @Get()
  @ApiOperation({ summary: "Получение списка коллективов с их руководителями" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Team] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll() {
    return this.teamsService.findAll();

  }

  @Get('direction')
  @ApiOperation({ summary: "Получение списка коллективов c учетом параметров (направление, вид)" })
  @ApiParam({ name: "type_team", required: false, description: "указать тип коллектива" })
  @ApiParam({ name: "id_parent", required: false, description: "указать его родителя (если коллектив, то направление)" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Team] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAllTeamsOfDirection(@Query() params) {
    return this.teamsService.findAllTeamsOfDirection(params.type_team, params.id_parent);
  }

  @Put(":id/archive")
  @ApiOperation({ summary: "Архивировать коллектив или наоборот" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  changeArchiveTeam(@Param("id") id, @Body() data) {
    return this.teamsService.changeArchiveTeam(id, data.isArchive);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamsService.remove(+id);
  // }



  //по ид команды найти всех юзеров
  @Get(':id/users')
  @ApiOperation({ summary: "Получение участников коллектива по id коллектива" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: UserFunction })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  teamsAndUsers(@Param('id') id: number) {
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
  @Get(':user_id/requisition')
  @ApiOperation({ summary: "Получение списка заявок на вступление в коллектив" })
  // @ApiParam({ user_name: "user_id", required: true, description: "Идентификатор коллектива" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async userRequisition(@Param('user_id') user_id: number) {
    let data = await this.teamsService.userRequisition(user_id)
    console.log(data)
    return data
  }

  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file) {

  @Post()
  @ApiOperation({ summary: "Создать новый коллектив (ответственный по направлению)" })
  @ApiBody({ description: "название коллектива, ФИО руководителя, описание проекта", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  @UseInterceptors(FileInterceptor('file'))
  // @UseInterceptors(FileInterceptor('document'))
  async create(@UploadedFile("file") file, @Body() createTeamDto: CreateTeamDto) {
    console.log(file)

    let path = await this.uploadsService.uploadFile(file)
    createTeamDto.charterTeam = path
    console.log("path " + path)

    let team = await this.teamsService.create(createTeamDto);

    return team
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
