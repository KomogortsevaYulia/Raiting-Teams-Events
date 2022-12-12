import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { IsNull } from "typeorm";
import { Team } from "../../teams/entities/team.entity";

export class CreateFunctionDto {

    @IsNotEmpty()
    title: string;
    type: string;

    @IsNotEmpty({ message: 'Team Поле пустое' })
    @Type(() => Number) 
    @IsNumber()
    team:Team
}
