import { IsArray, IsOptional } from 'class-validator';

export class SearchCabinetsDto {
  @IsOptional()
  @IsArray()
  ids: number[];
}
