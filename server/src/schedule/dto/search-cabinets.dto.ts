import { IsArray, IsOptional } from 'class-validator';

export class SearchCabinetsDto {
  @IsOptional()
  @IsArray()
  ids: number[];

  @IsOptional()
  time_start:string

  @IsOptional()
  time_end:string
}
