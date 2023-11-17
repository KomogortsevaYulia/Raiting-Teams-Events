// import { Test, TestingModule } from '@nestjs/testing';
// import { UploadsController } from './uploads.controller';
// import { UploadsService } from './uploads.service';
// import { EventsService } from '../events/events.service';

describe('UploadsController', () => {
  // let controller: UploadsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [UploadsController],
  //     providers: [UploadsService, EventsService],
  //   }).compile();
  //
  //   // controller = module.get<UploadsController>(UploadsController);
  // });

  describe('get file by path', () => {
    it('should throw an error', async () => {
      // await expect(controller.getFileBuffer({params:{path:"none"}})).rejects.toThrow();
    });
  });

  // describe('load file ', () => {
  //   it('should throw an error', async () => {

  //       console.log("Reading the file");

  //       let file: Express.Multer.File = {
  //         buffer: null,
  //         fieldname: "fieldname",
  //         originalname: "imageName.jpg",
  //         encoding: "binary",
  //         mimetype: "image/jpg",
  //         destination: __dirname,
  //         size: 1024*1024*21,
  //         stream: new Readable,
  //         filename: '',
  //         path: ''
  //       }
  //       //const fs =createReadSftream("C:\\Users\\1\\Downloads\\ORM8K-vg5tA.jpg");
  //      console.log(file)
  //     await expect(controller.uploadFile(file)).rejects.toThrow();
  //   });

  // });
});
