import {IsNotEmpty, IsNumber, Length } from 'class-validator'

export class ReassignLeaderTeamDto {

    @IsNumber()
    team:number

    @IsNumber()
    userId:number
}
