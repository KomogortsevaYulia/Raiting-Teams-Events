import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNumber } from 'class-validator';
export class CreateJournalDto {
  @IsNumber()
  @Type(() => Number)
  user_id: number;

  @IsNumber()
  @Type(() => Number)
  event_id: number;

  @IsBoolean()
  is_registered: boolean;

  @IsDateString()
  dateRegistration: Date;
}
