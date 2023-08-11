import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class DictionaryDto{

    @IsOptional()
    name:string

    @IsOptional()
    class_name:string

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    class_id:number
}