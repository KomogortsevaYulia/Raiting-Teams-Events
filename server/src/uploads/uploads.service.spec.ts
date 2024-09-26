import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from './uploads.service';
import { Readable } from 'stream';
import { HttpException, HttpStatus } from '@nestjs/common';
describe('UploadsService', () => {
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadsService],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
  });

  describe('get file by path', () => {
    it('должен собщить что файл по пути не найден', async () => {
      await expect(service.getFileBuffer('none')).rejects.toThrow(
        new HttpException('Путь не найден', HttpStatus.BAD_REQUEST),
      );
    });

    it('должен вернуть файл по указанному пути', async () => {
      await expect(
        service.getFileBuffer(
          './public/media/c8fa4705bb127ee6eadcf35b7771043ab.jpg',
        ),
      ).resolves.toBeDefined();
    });
  });

  describe('load file ', () => {
    it('should throw an error if file buffer is empty', async () => {
      console.log('Reading the file');

      const file: Express.Multer.File = {
        buffer: null,
        fieldname: 'fieldname',
        originalname: 'imageName.jpg',
        encoding: 'binary',
        mimetype: 'image/jpg',
        destination: __dirname,
        size: 1024 * 1024 * 2,
        stream: new Readable(),
        filename: '',
        path: '',
      };

      await expect(service.uploadFile(file)).rejects.toThrow(
        new HttpException('Буфер файла пустой', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
