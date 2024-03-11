import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchScheduleDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  team_id: number;

  // for cabinets_time
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  day_week_id: number;

  @IsOptional()
  time_start: string;

  @IsOptional()
  time_end: string;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // additional
}
