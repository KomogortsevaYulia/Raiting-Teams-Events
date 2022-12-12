

import { IsDate,  IsNotEmpty,IsNumber,IsString, Length } from 'class-validator'


export class CreateTeamDto {

    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,50,{
        message: 'Название, максимальная длина текста 50'
    })
    title: string

    @IsNotEmpty()
    direction: string

    image: string

    @Length(1,1000,{
        message: 'Описание, максимальная длина текста 1000'
    })
    description: string

    creation_date: Date

}
