import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { extname } from 'path';
import * as fs from 'fs';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class UploadsService {


  async uploadFile(file) {

    const pathStart = "/public/media"

    const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    const filename = `${randomName}${extname(file.originalname)}`;
    const path = `.${pathStart}/${filename}`;

    const stream = createWriteStream(path);
    stream.write(file.buffer);
    stream.end();

    return path
  }


  async getFileBuffer(path: string) {

    // console.log("path " + path)

    let buffer: Buffer = null;
    // проверить существование файла
    if (fs.existsSync(path)) {
      buffer = fs.readFileSync(path);
    } else {
      throw new HttpException('Путь не найден', HttpStatus.BAD_REQUEST)
    }


    // let res: Promise<unknown> = null
    // if (fs.existsSync(path)) {
    //   res = new Promise((resolve, reject) => {
    //     fs.readFile(path, (err, data) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(data.toString());
    //       }
    //     });
    //   });
    // } else {
    //   throw new HttpException('Путь не найден', HttpStatus.BAD_REQUEST)
    // }

    return buffer
  }



  async getFileImageBase64(path: string) {

    let buffer = await this.getFileBuffer(path)

    return this.convertToBase64(buffer)
  }


  async convertToBase64(buffer: Buffer) {
    return buffer.toString('base64')
  }

}
