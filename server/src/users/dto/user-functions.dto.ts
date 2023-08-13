import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class UserFunctionDto {

    @IsOptional()
    @Type(() => Number) 
    @IsNumber()
    function: number;

    @IsOptional()
    @Type(() => Number) 
    @IsNumber()
    user: number;

    @IsOptional()
    @Type(() => Number) 
    @IsNumber()
    team: number;
}
