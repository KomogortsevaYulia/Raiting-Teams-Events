import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, Put, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Team } from './entities/team.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { UsersService } from '../users/users.service';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UploadsService } from '../uploads/uploads.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SearchTeamDto } from './dto/search-team.dto';
import { FileSizeValidationPipe } from '../uploads/validation/file.validation.pipe ';

@ApiTags('teams')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
    private readonly uploadsService: UploadsService) { }


  // @Get()
  // @ApiOperation({ summary: "Получение списка коллективов с их руководителями" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Team] })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // findAll() {
  //   return this.teamsService.findAll();

  // }

  @Get()
  @ApiOperation({ summary: "Получение списка коллективов с их руководителями" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Team]  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll(
    @Query() params: SearchTeamDto) {
    // if(params.tags)
    // console.log(params)
    return this.teamsService.findAll(params);
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
  @ApiOperation({ summary: "Обновить коллектив (ответственный по направлению)" })
  @ApiBody({ description: "название коллектива, ФИО руководителя, описание проекта", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  @UseInterceptors(FilesInterceptor('files'))
  async update(@Param('id') id: number, @UploadedFiles(new FileSizeValidationPipe()) files:Express.Multer.File[], @Body() updateTeamDto: UpdateTeamDto) {
    console.log(files)
    // console.log(updateTeamDto)

    // устав коллектива
    let ustavPath = updateTeamDto.charterTeam
    //документ
    let docPath = updateTeamDto.document

    // console.log("ustav1 " + ustavPath)
    // console.log("doc1 " + docPath)

    if (files.length < 3) {
      for (let f in files) {
        //console.log("have files " + (ustavPath))
       
        //оставить только начало файла без расширения
        if (files[f].originalname.split(".").shift() == "ustav") {

          //console.log("ustav loaded ")
          ustavPath = await this.uploadsService.uploadFile(files[f])
        } else if (files[f].originalname.split(".").shift() == "document") {

          docPath = await this.uploadsService.uploadFile(files[f])
        }
      }
    }

    updateTeamDto.charterTeam = ustavPath
    //console.log("ustav " + ustavPath)

    updateTeamDto.document = docPath
    //console.log("doc " + docPath)

    let team = await this.teamsService.update(id, updateTeamDto);

    return team
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
    console.log("enter" + id)
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

  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file) {

  @Post()
  @ApiOperation({ summary: "Создать новый коллектив (ответственный по направлению)" })
  @ApiBody({ description: "название коллектива, ФИО руководителя, описание проекта", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FilesInterceptor('files'))
  // @UseInterceptors(FileInterceptor('document'))
  async create(@UploadedFiles() files, @Body() createTeamDto: CreateTeamDto) { //, @Body() createTeamDto: CreateTeamDto
    // console.log(files)
    console.log(createTeamDto)

    let ustav = null
    let doc = null

    for (let f in files) {

     // console.log(files[f])
      //оставить только начало файла без расширения
      if (files[f].originalname.split(".").shift() == "ustav"
        && ustav == null) {

        ustav = await this.uploadsService.uploadFile(files[f])
      } else if (files[f].originalname.split(".").shift() == "document"
        && doc == null) {

        doc = await this.uploadsService.uploadFile(files[f])
      }
    }

    // let path = await this.uploadsService.uploadFile(files[0])
    createTeamDto.charterTeam = ustav
    //.log("ustav " + ustav)

    createTeamDto.document = doc
   // console.log("doc " + doc)

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
