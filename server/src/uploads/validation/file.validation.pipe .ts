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
    // "value" is an object containing the file's attributes and metadata
    const maxSize = 1024*1024*20;

    value.forEach(element => {
     
      if(element.size >= maxSize){
        throw new  BadRequestException(`Validation failed. Размер файла должен быть < ${maxSize} мб`);
      }
    });
   
   
    return value;
  }
}