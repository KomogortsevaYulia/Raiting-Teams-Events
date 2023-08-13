import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Team } from "src/teams/entities/team.entity";

export class CreateFunctionDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty({ message: 'Team Поле пустое' })
    @Type(() => Number)
    @IsNumber()
    team: number
}
