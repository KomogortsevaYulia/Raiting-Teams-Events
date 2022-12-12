

import { Type } from 'class-transformer'
import {IsNotEmpty, IsNumber, Length } from 'class-validator'
import { Team } from '../entities/team.entity'
import { Function } from '../../users/entities/function.entity'
import { IsNull } from 'typeorm'


export class CreateTeamDto {

    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,100,{
        message: 'Название, максимальная длина текста 50'
    })
    title: string

    creation_date: Date

    image: string[]

    tags: string[]

    @Length(1,1000,{
        message: 'Описание, максимальная длина текста 1000'
    })
    description: string

    id_parent:Team[]

    type_team: string

    
    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,50,{
        message: 'Краткое название, максимальная длина текста 50'
    })
    shortname:string

    functions:Function[]

}
