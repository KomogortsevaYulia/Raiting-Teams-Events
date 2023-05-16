import { PipeTransform, Injectable, ArgumentMetadata, FileValidator, ValidationPipe, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform<any>{ // extends  FileValidator

  // https://thecodeway.hashnode.dev/mastering-file-upload-and-validation-in-nestjs-with-multer
 
  // isValid(file?: any): boolean | Promise<boolean> {
  //   throw new Error('Method not implemented.');
  // }
  // buildErrorMessage(file: any): string {
  //   throw new Error('Method not implemented.');
  // }

  transform(value: Express.Multer.File[], metadata: ArgumentMetadata) {

    const maxSize = 1024*1024*20; //byte
   
    value.forEach(file => {

      if(file.size >= maxSize){
        const originalname = file.originalname ? file.originalname.split(".").shift() : ""
        const fileSize = Math.round(file.size/ (1024*1024))

        throw new  BadRequestException(
        `Ошибка при загрузке файла ${originalname}. 
        Размер файла ${fileSize} мб, файл должен весить < 20 мб`);
      }
    });
   
   
    return value;
  }
}