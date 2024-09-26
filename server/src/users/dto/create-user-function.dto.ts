import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateUserFunctionDto {
  @Type(() => Number)
  @IsNumber()
  function: number;

  @Type(() => Number)
  @IsNumber()
  user: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  team: number;
}
