import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchVisitsDto {
  @Type(() => Number)
  @IsNumber()
  team_id: number;

  @IsOptional()
  @IsString()
  date_visit_start: string;

  @IsOptional()
  @IsString()
  date_visit_end: string;
}
