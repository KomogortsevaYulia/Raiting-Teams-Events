
import {IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator'
import { MaxFileSize } from './MaxFileSize';


export class UploadFileDto {
    // @IsNotEmpty({ message: 'Поле пустое' })
    // @IsString()
    // @Length(1,2,{
    //     message: 'Название, максимальная длина текста 2'
    // })
    // fieldname: string
    // originalname: string
    // encoding: string
    // mimetype: string
    // buffer: Buffer

    // @IsNumber()
    // @Min(0)
    // @Max(10)
    // //20 mb
    // size: number
    @MaxFileSize(1024 * 1024, { message: 'File size must be less than 1MB' })
    file: Express.Multer.File;
}
