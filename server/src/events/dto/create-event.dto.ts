import {IsDate, IsNotEmpty, IsNumber, Length } from 'class-validator'
export class CreateEventDto {
    @IsNotEmpty({ message: 'Поле пустое' })
    @Length(1,100,{
        message: 'Название, максимальная длина текста 50'
    })
    title: string
    @Length(1,1000,{
        message: 'Описание, максимальная длина текста 1000'
    })
    description: string

    @IsDate()
    dateStart:Date

    @IsDate()
    dateEnd:Date
    // functions:Function[]
}
