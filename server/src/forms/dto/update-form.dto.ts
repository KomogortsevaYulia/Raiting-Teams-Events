import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Form } from '../entities/form.entity';

export class UpdateFormDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Поле пустое' })
  @Type(() => Number)
  @IsNumber()
  form: Form;
}
