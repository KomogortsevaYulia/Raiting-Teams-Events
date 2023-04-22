
import {IsNotEmpty, IsNumber, IsOptional, Length, MaxLength, isEmpty } from 'class-validator'


export class UpdateTeamDto {

    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,100,{
        message: 'Название, максимальная длина текста 50'
    })
    title: string
    
    @Length(1,1000,{
        message: 'Описание, максимальная длина текста 1000'
    })
    description: string

    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,50,{
        message: 'Краткое название, максимальная длина текста 50'
    })
    shortname:string

    @IsNumber()
    oldLeaderId:number

    @IsNumber()
    newLeaderId:number

    @IsOptional()
    @Length(1,50, {
        message: 'Кабинет, максимальная длина текста 50'
    })
    cabinet:string

    @IsNotEmpty({ message: 'Ссылка на документ пустая' })
    document:string

    @IsNotEmpty({ message: 'Ссылка на устав пустая' })
    charterTeam:string

    // functions:Function[]
}
