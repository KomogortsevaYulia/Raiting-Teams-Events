import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateUserFunctionDto {

    @Type(() => Number) 
    @IsNumber()
    function: number;

    @Type(() => Number) 
    @IsNumber()
    user: number;
}
