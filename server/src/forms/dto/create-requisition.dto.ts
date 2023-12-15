import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { FormField } from '../entities/form_field.entity';

export class RequisitionFieldsC {
  value: string;

  @IsNumber()
  form_fields_id: FormField;
}

export class CreateRequisitionDto {
  @IsNumber()
  team_id: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Поля пустые' })
  fields: RequisitionFieldsC[];
}
