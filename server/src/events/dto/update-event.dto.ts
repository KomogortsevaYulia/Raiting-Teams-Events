import { IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  status: string; // статус
}
