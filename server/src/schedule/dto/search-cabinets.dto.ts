import { IsArray, IsOptional, IsString } from 'class-validator';

export class SearchCabinetsDto {
  @IsOptional()
  @IsArray()
  ids: number[];

  @IsOptional()
  tag: string;

  @IsOptional()
  time_start: string;

  @IsOptional()
  time_end: string;
}
