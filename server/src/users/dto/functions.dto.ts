import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FunctionDto {
  @IsOptional()
  title: string;

  @IsOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  team: number;
}
