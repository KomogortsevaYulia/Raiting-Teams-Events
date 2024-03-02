import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCabinetDto {
  @ApiProperty({
    type: String,
    example: 'В-100',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
