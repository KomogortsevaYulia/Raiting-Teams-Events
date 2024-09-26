import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class UpdateFieldDto {
  @IsBoolean()
  @Type(() => Boolean)
  archive: boolean;
}
