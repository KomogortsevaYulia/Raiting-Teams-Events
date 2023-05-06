import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from './uploads.service';

describe('UploadsService', () => {
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadsService],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
  });

  describe('get file by path', () => {
    it('should throw an error', async () => {
     await expect(service.getFileBuffer("none")).rejects.toThrow();
    });
    
  });

  describe('load file ', () => {
    it('should throw an error', async () => {
    //const file = new Stream
     await expect(service.getFileBuffer("none")).rejects.toThrow();
    });
    
  });

});


