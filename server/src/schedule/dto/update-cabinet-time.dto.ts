import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCabinetTimeDto {
  @IsOptional()
  @IsNumber()
  id_cabinet: number;

  @IsOptional()
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
