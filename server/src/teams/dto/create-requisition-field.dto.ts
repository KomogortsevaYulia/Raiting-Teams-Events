import { IsString } from 'class-validator';
import { Requisitions } from '../entities/requisition.entity';
import { FormField } from 'src/forms/entities/form_field.entity';

export class CreateRequisitionFieldDto {
  @IsString()
  value: string;

  requisition: Requisitions;

  form_field: FormField;
}
