import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateCabinetTimeDto {
  @IsNumber()
  id_team_schedule: number;

  @IsNumber()
  id_cabinet: number;

  @IsNumber()
  id_day_week: number;

  @IsOptional()
  time_start: string;

  @IsOptional()
  time_end: string;

  @IsOptional()
  @IsBoolean()
  repeat: boolean;
}
