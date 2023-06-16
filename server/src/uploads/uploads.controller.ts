import { Controller, Get, Post, UploadedFile, UseInterceptors, Redirect, HttpStatus, Query, Header, Headers, Res, ParseFilePipe, MaxFileSizeValidator, ParseFilePipeBuilder, FileTypeValidator, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EventsService } from '../events/events.service';
import { Request, Response } from 'express';
import { FileSizeValidationPipe } from './validation/file.validation.pipe';
import { SearchEventDto } from 'src/events/dto/search-event.dto';
import { FileImageValidationPipe } from './validation/image_file.validation.pipe';
import { type } from 'os';


@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly eventsService: EventsService) { }

  @Post()
  @ApiOperation({ summary: "Сохранение файла на сервере (любой формат)" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() request: Request, @UploadedFile(
    new FileSizeValidationPipe()

  ) file: Express.Multer.File) {

    const startPathUrl = `${request.protocol}://${request.get('host')}`;

    let path = await this.uploadsService.uploadFile(startPathUrl, file)

    return path
  }


  @Post('image')
  @ApiOperation({ summary: "Сохранение изображения на сервер" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "файл должен весить < 20 мб" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Неподдерживаемый тип файла" })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Req() request: Request, @UploadedFile(new FileImageValidationPipe())
  file: Express.Multer.File) {

    const startPathUrl = `${request.protocol}://${request.get('host')}`;

    let path = await this.uploadsService.uploadFile(startPathUrl, file)
    return path
  }



  @Get("file_buffer")
  @ApiOperation({ summary: "Получение файла с сервера в виде буфера" })
  @ApiParam({ name: 'path', description: "путь к файлу для сохранения" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async getFileBuffer(@Query() params) {

    let file = await this.uploadsService.getFileBuffer(params.path)

    return file
  }


  // @Get("image_base64")
  // @ApiOperation({ summary: "Получение файла с сервера в виде base64 для изображений" })
  // @ApiParam({ name: 'path', description: "путь к файлу для сохранения" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // async getFileImageBase64(@Query() params) {

  //   let base64 = await this.uploadsService.getFileImageBase64(params.path)

  //   return base64
  // }


  // reports--------------------------------------------------------------------------
  //get excel file about events
  @Get("excel/events_direction")
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=data.xlsx')
  @ApiOperation({ summary: "Получение файла excel по мероприятиям направления " })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async getReportEventsOfDirection(@Res() res: Response, @Query() searchEventDto:SearchEventDto) {

    // получить все мероприятия по заданным параметрам
    let events = await this.eventsService.findAllEvents(searchEventDto)
    await this.uploadsService.getReportEvents(res, events[0], events[1])
  }

  //get excel file about events

  @Get("excel/events_of_team")
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=data1.xlsx')
  @ApiOperation({ summary: "Получение файла excel по мероприятиям коллектива " })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async getReportEventsOfTeam(@Res() res: Response, @Query() searchEventDto:SearchEventDto) {

    let events = await this.eventsService.getEventsViaJournalsByTeam(searchEventDto)

    await this.uploadsService.getReportEvents(res, events[0], events[1])

  }

}
