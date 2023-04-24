import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Redirect, HttpStatus, Query } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) { }

  @Post()
  @ApiOperation({ summary: "Сохранение файла на сервере" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно"})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {

    console.log(file)
    let path = await this.uploadsService.uploadFile(file)

    return path
  }


  @Get()
  async getFile(@Query() params) {

    console.log(params.path)
    let file = await this.uploadsService.getFile(params.path)

    return file
  }

}
