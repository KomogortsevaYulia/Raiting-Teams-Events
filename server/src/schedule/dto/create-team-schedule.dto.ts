import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTeamScheduleDto {
  @ApiProperty({ type: Date, description: 'Дата начала расписания' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date_start?: Date;

  @ApiProperty({ type: Date, description: 'Дата окончания расписания' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date_end?: Date;

  @ApiProperty({ description: 'ID пользователя' })
  @IsInt()
  id_user: number;

  @ApiProperty({ description: 'ID коллектива' })
  @IsInt()
  id_team: number;
}
