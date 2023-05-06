import { PipeTransform, Injectable, ArgumentMetadata, FileValidator } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe extends  FileValidator{

  // https://thecodeway.hashnode.dev/mastering-file-upload-and-validation-in-nestjs-with-multer
 
  isValid(file?: any): boolean | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  buildErrorMessage(file: any): string {
    throw new Error('Method not implemented.');
  }

  // transform(value: Express.Multer.File[], metadata: ArgumentMetadata) {
  //   // "value" is an object containing the file's attributes and metadata
  //   const maxSize = 1024*1024*20;
  //   let msg:string = null

  //   value.forEach(element => {
     
  //     if(element.size >= maxSize){
  //       msg = "size can be < " + maxSize
  //     }
  //   });
   
   
  //   return msg??value;
  // }
}