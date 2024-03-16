import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class DictionaryDto {
  @IsOptional()
  name: string;

  @IsOptional()
  class_name: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  class_id: number;

  constructor(name: string, class_is: number) {
    this.name = name;
    this.class_id = class_is;
  }
}
