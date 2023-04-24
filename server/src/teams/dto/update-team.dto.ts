
import {IsNotEmpty, IsNumber, IsOptional, Length, MaxLength, isEmpty } from 'class-validator'


export class UpdateTeamDto {

    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,100,{
        message: 'Название, максимальная длина текста 50'
    })
    title: string
    
    @Length(1,3000,{
        message: 'Описание, максимальная длина текста 1000'
    })
    description: string

    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,50,{
        message: 'Краткое название, максимальная длина текста 50'
    })
    shortname:string

    @IsOptional()
    @IsNumber()
    oldLeaderId:number

    @IsOptional()
    @IsNumber()
    newLeaderId:number

    @IsOptional()
    @Length(1,50, {
        message: 'Кабинет, максимальная длина текста 50'
    })
    cabinet:string

    @IsNotEmpty({ message: 'Ссылка на документ пустая' })
    @Length(1,300,{
        message: 'Ссылка на документ, максимальная длина текста 300'
    })
    document:string

    @IsNotEmpty({ message: 'Ссылка на устав пустая' })
    @Length(1,300,{
        message: 'ССсылка на устав, максимальная длина текста 300'
    })
    charterTeam:string

    // functions:Function[]
}
