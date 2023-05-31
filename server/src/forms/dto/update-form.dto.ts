import { PartialType } from '@nestjs/swagger';
import { createFormDto } from './create-form.dto';
import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateFormDto {
    @IsOptional()
    @IsNotEmpty({ message: 'Поле пустое' })
    form_id:number
}