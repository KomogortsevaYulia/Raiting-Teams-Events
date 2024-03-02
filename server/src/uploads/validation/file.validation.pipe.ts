import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: Express.Multer.File[], metadata: ArgumentMetadata) {
    const maxSize = 1024 * 1024 * 20; //byte

    if (value) {
      value.forEach((file) => {
        if (file.size >= maxSize) {
          const originalname = file.originalname
            ? file.originalname.split('.').shift()
            : '';
          const fileSize = Math.round(file.size / (1024 * 1024));

          throw new BadRequestException(
            `Ошибка при загрузке файла ${originalname}. 
          Размер файла ${fileSize} мб, файл должен весить < 20 мб`,
          );
        }
      });
    }

    return value;
  }
}
