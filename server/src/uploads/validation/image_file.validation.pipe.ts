import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileImageValidationPipe implements PipeTransform<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    this.checkSize(file);
    this.checkType(file);

    return file;
  }

  private checkSize(file: Express.Multer.File) {
    const maxSize = 1024 * 1024 * 20; //byte = 20 мб

    if (file.size >= maxSize) {
      // const originalname = file.originalname ? file.originalname.split(".").shift() : ""
      const fileSize = Math.round(file.size / (1024 * 1024));

      throw new BadRequestException(
        `Ошибка при загрузке файла ${extname(file.originalname)}. 
          Размер файла ${fileSize} мб, файл должен весить < 20 мб`,
      );
    }
  }

  private checkType(file: Express.Multer.File) {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      throw new BadRequestException(
        `Неподдерживаемый тип файла ${extname(file.originalname)}`,
      );
    }
  }
}
