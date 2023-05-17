import { Type } from 'class-transformer'
import {IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsTimeZone, Length, isDate, isTimeZone } from 'class-validator'
import { Dictionary } from 'src/general/entities/dictionary.entity'
export class CreateJournalDto {
    
    @IsNumber()
    @Type(() => Number)
    user_id: number

    @IsNumber()
    @Type(() => Number)
    event_id: number

    @IsBoolean()
    is_registered: boolean

    @IsDateString()
    dateRegistration: Date
    
}
