import { PartialType } from '@nestjs/swagger';
import { createFormDto } from './create-form.dto';

export class UpdateFormDto extends PartialType(createFormDto) {}