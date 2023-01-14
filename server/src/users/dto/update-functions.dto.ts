import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Team } from "../../teams/entities/team.entity";

export class UpdateFunctionDto {

    @IsNotEmpty()
    @Type(() => Number) 
    @IsNumber()
    id: number
   
    @IsNotEmpty()
    type_function: string


    @IsNotEmpty()
    title: string;

    @IsNotEmpty({ message: 'Team Поле пустое' })
    @Type(() => Number) 
    @IsNumber()
    team:Team
}
