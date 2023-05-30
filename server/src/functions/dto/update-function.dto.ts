import { PartialType } from '@nestjs/mapped-types';
import { CreateFunctionDto } from './create-function.dto';

export class UpdateFunctionDto extends PartialType(CreateFunctionDto) {
    education_group:string;
    title_role:string;
}
