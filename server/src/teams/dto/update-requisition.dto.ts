import { IsOptional} from 'class-validator'

export class UpdateRequisitionDto {

    @IsOptional()
    status_name:string
}
