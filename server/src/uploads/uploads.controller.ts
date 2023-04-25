import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Redirect, HttpStatus, Query } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) { }

  @Post()
  @ApiOperation({ summary: "Сохранение файла на сервере" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {

    console.log(file)
    let path = await this.uploadsService.uploadFile(file)

    return path
  }


  @Get("file_buffer")
  @ApiOperation({ summary: "Получение файла с сервера в виде буфера" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async getFileBuffer(@Query() params) {

    console.log(params.path)
    let file = await this.uploadsService.getFileBuffer(params.path)

    return file
  }

  @Get("image_base64")
  @ApiOperation({ summary: "Получение файла с сервера в виде base64 для изображений" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async getFileImageBase64(@Query() params) {

    console.log(params.path)
    let base64 = await this.uploadsService.getFileImageBase64(params.path)

    return base64
  }

}
