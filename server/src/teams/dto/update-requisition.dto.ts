import { Type } from 'class-transformer'
import { IsNumber, IsOptional} from 'class-validator'

export class UpdateRequisitionDto {

    @IsOptional()
    status_name:string
    
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    user_id:number
}
