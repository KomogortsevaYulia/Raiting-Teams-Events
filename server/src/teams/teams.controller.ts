import { Controller, Get, Post, Body, Patch, Put, Param, Delete, HttpStatus, Query, UploadedFile, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Team } from './entities/team.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { UsersService } from '../users/users.service';
import { diskStorage } from 'multer';
import { extname } from 'path'
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { HttpException } from '@nestjs/common';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UploadsService } from '../uploads/uploads.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SearchTeamDto } from './dto/search-team.dto';
import { Requisitions } from './entities/requisition.entity';
import { Request } from 'express';
import { FileSizeValidationPipe } from 'src/uploads/validation/file.validation.pipe';
import { FileImageValidationPipe } from 'src/uploads/validation/image_file.validation.pipe';

@ApiTags('teams')  // <---- Отдельная секция в Swagger для всех методов контроллера
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
    private readonly uploadsService: UploadsService,
  ) { }


  // @Get()
  // @ApiOperation({ summary: "Получение списка коллективов с их руководителями" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Team] })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // findAll() {
  //   return this.teamsService.findAll();

  // }

  @Get()
  @ApiOperation({ summary: "Получение списка коллективов с их руководителями" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: [Team] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll(
    @Query() params: SearchTeamDto) {
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
  async update(@Req() request: Request, @Param('id') id: number, @UploadedFiles(new FileSizeValidationPipe()) files: Express.Multer.File[], @Body() updateTeamDto: UpdateTeamDto) {

    const startPathUrl = `${request.protocol}://${request.get('host')}`;

    // устав коллектива
    let ustavPath = updateTeamDto.charterTeam
    //документ
    let docPath = updateTeamDto.document

    // console.log("ustav1 " + ustavPath)
    // console.log("doc1 " + docPath)

    if (files.length < 3) {
      for (let f in files) {

        //оставить только начало файла без расширения
        if (files[f].originalname.split(".").shift() == "ustav") {

          ustavPath = await this.uploadsService.uploadFile(startPathUrl, files[f])
        } else if (files[f].originalname.split(".").shift() == "document") {

          docPath = await this.uploadsService.uploadFile(startPathUrl, files[f])
        }
      }
    }

    updateTeamDto.charterTeam = ustavPath

    updateTeamDto.document = docPath

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
  @ApiBody({ description: "название коллектива, ФИО руководителя, описание проекта", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request, какие то данные неверно введены" })
  @UseInterceptors(FilesInterceptor('files'))
  async create(@Req() request: Request, @UploadedFiles(new FileSizeValidationPipe()) files: Express.Multer.File[], @Body() createTeamDto: CreateTeamDto) { //, @Body() createTeamDto: CreateTeamDto

    const startPathUrl = `${request.protocol}://${request.get('host')}`;

    let ustav = null
    let doc = null

    for (let f in files) {

      //оставить только начало файла без расширения
      if (files[f].originalname.split(".").shift() == "ustav"
        && ustav == null) {

        ustav = await this.uploadsService.uploadFile(startPathUrl, files[f])
      } else if (files[f].originalname.split(".").shift() == "document"
        && doc == null) {

        doc = await this.uploadsService.uploadFile(startPathUrl, files[f])
      }
    }

    createTeamDto.charterTeam = ustav
    createTeamDto.document = doc

    let team = await this.teamsService.create(createTeamDto);

    return team
  }



  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: "Загрузить изображение коллектива" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async addImage(@Req() request: Request, @Param('id') id: number, @UploadedFile(new FileImageValidationPipe()) file: Express.Multer.File) {
    const startPathUrl = `${request.protocol}://${request.get('host')}`;

    let path = await this.uploadsService.uploadFile(startPathUrl, file)
    return this.teamsService.addImage(id, path);
  }

  // @Post(':id/image')
  // @ApiOperation({ summary: "Загрузить изображение коллектива" })
  // @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @UseInterceptors(FileInterceptor('file'))
  // async addImsage(@Req() request: Request, @Param('id') id: number, @UploadedFile(new FileImageValidationPipe())
  // file: Express.Multer.File) {

  //   const startPathUrl = `${request.protocol}://${request.get('host')}`;

  //   let path = await this.uploadsService.uploadFile(startPathUrl, file)
  //   return this.teamsService.addImage(id, path);
  // }


  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file) {


  // --------------------------------------------------------------------
  @Get("/:id/requisition")
  @ApiOperation({ summary: "Получить список заявок в коллектив" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор коллектива" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Function })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async userRequisition(@Param('id') team_id: number): Promise<Requisitions[]> {

    const requisitions = await this.teamsService.userRequisition(team_id)

    return requisitions;
  }
  // --------------------------------------------------------------------


  // @Get('directions')
  // @ApiOperation({ summary: "отдает список направлений с юзерами которые за них отвечают" })
  // @ApiParam({ name: "directions", required: true, description: "Идентификатор " })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Team })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // directionsAndUsers() {
  //   return this.teamsService.directionsAndUsers()
  // }

}
