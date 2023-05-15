import { Type } from 'class-transformer'
import {IsDate, IsNotEmpty, IsNumber, Length } from 'class-validator'
import { Dictionary } from 'src/general/entities/dictionary.entity'
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
    dateStart: Date

    @IsDate()
    dateEnd: Date
    // functions:Function[]

    @IsDate()
    dateStartRegistration: Date
    
    @IsDate()
    dateEndRegistration: Date

  
    @Length(1,1000,{
    })
    location: string

  

    @IsNumber()
    @Type(() => Number)
    count_people: number


    


    @Length(1,1000,{
    })
    control: string

    

    @Length(1,1000,{
    })
    email: string

    @Length(1,1000,{
    })
    phone: string


    @Length(1,1000,{
    })
    social_links: string[]

    @Length(1,1000,{
    })
    level: Dictionary

   

    @Length(1,1000,{
    })
    direction: Dictionary

    @Length(1,1000,{
    })
    type_participation: Dictionary
    
    @Length(1,1000,{
    })
    format: Dictionary

    @Length(1,1000,{
    })
    clarifying_direction: Dictionary

    @Length(1,1000,{
        
    })
    character_event: Dictionary

    
}
