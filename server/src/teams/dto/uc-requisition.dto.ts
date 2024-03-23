import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class RequisitionDto {
  @IsOptional()
  status_name: string;

  @IsOptional()
  comment_leader: string;

  // user
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id: number;

  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  fullname: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_update: Date;

  // additional
  @IsOptional()
  date_update_order: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  statuses: string[] = [];
}
