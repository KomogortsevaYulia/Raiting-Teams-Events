import {IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, isEmpty, isString } from 'class-validator'
import { Team } from '../entities/team.entity'
import { Function } from '../../users/entities/function.entity'
import { Type } from 'class-transformer'


export class CreateTeamDto {

    @IsNotEmpty({ message: 'Поле пустое' })
    @IsString()
    @Length(1,100,{
        message: 'Название коллектива, максимальная длина текста 1-100'
    })
    title: string

    @Length(1,3000,{
        message: 'Описание, максимальная длина текста 1-3000'
    })
    short_description: string

    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,50,{
        message: 'Краткое название, максимальная длина текста 1-50'
    })
    shortname:string

    @IsNumber()
    @Type(() => Number)
    userID:number

    @IsOptional()
    @Length(1,50, {
        message: 'Кабинет, максимальная длина текста 1-50'
    })
    cabinet:string

    @IsOptional()
    @IsNotEmpty({ message: 'Ссылка на документ пустая' })
    document:string

    @IsOptional()
    @IsNotEmpty({ message: 'Ссылка на устав пустая' })
    charterTeam:string

}
