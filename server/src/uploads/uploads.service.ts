import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { extname } from 'path';
import * as fs from 'fs';
import { Event } from 'src/events/entities/event.entity';
import * as ExcelJS from 'exceljs';
import { Workbook } from 'exceljs';
import { Response } from 'express';

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



  // install excel file for events in direction
  async getReportEventsOfDirection(res: Response, events: Event[], countEvents: number,
    params = {
      type: null, level: null,
      direction: null, dateStart: null, dateEnd: null
    }) {

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'my_excel_file.xlsx',
    );

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');
    worksheet.columns = [
      { header: "название", key: "name", width: 25 },
      { header: "уровень", key: "level", width: 15 },
      { header: "тип", key: "type", width: 15 },
      { header: "формат", key: "format", width: 15 },
      { header: "дата начала", key: "startDate", width: 15 },
      { header: "дата конца", key: "endDate", width: 15 }
    ]

    worksheet.getRow(1).font = { bold: true }

    // Add some data to the worksheet

    let indexRow = 1
    for (let i in events) {

      let e = events[i]
      let arrData = []

      arrData.push(e.title ?? "-", e.level ? e.level.name : "-", e.type ? e.type.name : "-",
        e.format ? e.format.name : "-",
        e.dateStart, e.dateEnd)

      worksheet.getRow(indexRow).getCell(1).alignment = { wrapText: true }
      worksheet.addRow(arrData);

      indexRow++
    }

    // Set the headers and disposition


    // Send the workbook as a response
    await workbook.xlsx.write(res)
    res.end();
  }



  // async downloadExcel(res: Response) {
  //   const workbook = new Workbook();
  //   const worksheet = workbook.addWorksheet('My Sheet');

  //   // Add some data to the worksheet
  //   worksheet.addRow(['Name', 'Age']);
  //   worksheet.addRow(['John Doe', 30]);
  //   worksheet.addRow(['Jane Doe', 25]);

  //   // Write the workbook to a buffer
  //   const buffer = await workbook.xlsx.writeBuffer();

  //   // Set the headers and disposition
  //   res.setHeader(
  //     'Content-Type',
  //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   );
  //   res.setHeader('Content-Disposition', 'attachment; filename=my_excel_file.xlsx');

  //   // Send the buffer as the response body
  //   res.write(buffer);
  //   res.end();
  // }

}
