import { IsArray, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRequisitionDto {
  // @IsInt()
  // userId: number;

  @IsNumber()
  @Type(() => Number)
  team_id: number;

  @IsArray()
  @IsString({ each: true })
  fields: string[];
}
