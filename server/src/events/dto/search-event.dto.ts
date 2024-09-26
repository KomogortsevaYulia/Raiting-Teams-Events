import { Entity } from 'typeorm';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

@Entity('events')
export class SearchEventDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  teamId: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsOptional()
  type: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  level: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  direction: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateStart: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateEnd: Date;

  @IsOptional()
  title: string;

  @IsOptional()
  tags: string;

  @IsOptional()
  status: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset: number;

  // additional
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  search_txt: string;

  // additional
  @IsOptional()
  date_update_order: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  journal_team_id: number;
}
