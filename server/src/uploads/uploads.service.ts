import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { extname } from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadsService {


  async uploadFile(file) {
    const pathStart = "/public/media"

    const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    const filename = `${randomName}${extname(file.originalname)}`;
    const path = `${pathStart}/${filename}`;

    const stream = createWriteStream(`.${pathStart}/${filename}`);
    stream.write(file.buffer);
    stream.end();

    return path
  }


  async getFile(path: string) {

    const stream = createReadStream(path);

    return stream
  }
}
