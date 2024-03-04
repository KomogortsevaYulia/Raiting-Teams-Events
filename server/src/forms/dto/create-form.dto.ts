import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Form } from '../entities/form.entity';

export class createUserFormDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Поле пустое' })
  value: string;

  @IsNumber()
  @Type(() => Number)
  user: number;

  @IsNumber()
  @Type(() => Number)
  field: number;
}

export class CreateFormDto {
  @IsNumber()
  @Type(() => Number)
  team_id: number;
}

export class CreateFormFieldsDto {
  // @IsNumber()
  // @Type(() => Number)
  @Type(() => Number)
  @IsNumber()
  form: Form;

  @IsString()
  @IsNotEmpty({ message: 'Поле пустое' })
  title: string;

  @IsBoolean()
  @Type(() => Boolean)
  required: boolean;
}
