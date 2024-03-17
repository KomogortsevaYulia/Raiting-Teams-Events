import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateCabinetTimeDto {
  @IsNumber()
  id_team_schedule: number;

  @IsNumber()
  id_cabinet: number;

  @IsNumber()
  user_id: number;

  // @IsNumber()
  // id_day_week: number;

  @IsOptional()
  time_start: string;

  @IsOptional()
  time_end: string;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsBoolean()
  repeat: boolean;
}
