import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';

export class FunctionDto {
  @IsOptional()
  title: string;

  @IsOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  team: number;
}
