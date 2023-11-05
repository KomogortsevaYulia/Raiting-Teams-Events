import { Type } from 'class-transformer';
import { IsNumber, IsOctal, IsOptional } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';

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
