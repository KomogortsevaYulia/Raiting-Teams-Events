import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchTeamDto {
  @IsOptional()
  @IsString()
  type = 'teams';

  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  title: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  tags: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  description: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  shortname: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_archive: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  set_open: boolean;

  //id parent
  @IsOptional()
  @IsArray()
  directions: number[];

  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @Type(() => Number)
  offset: number;

  // нужно для того, чтобы можно было приджойнить доп поля
  // values: ["leaders"]
  @IsOptional()
  @IsArray()
  fields: string[] = [];

  //   addition
  @IsOptional()
  searchTxt: string;
}
