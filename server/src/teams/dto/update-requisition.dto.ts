import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class RequisitionDto {
  @IsOptional()
  status_name: string;

  @IsOptional()
  comment_leader: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id: number;
}
