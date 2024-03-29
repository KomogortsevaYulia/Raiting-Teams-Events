import {IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from 'class-validator'
import { Type } from 'class-transformer'
import { Form } from '../entities/form.entity'

export class createUserFormDto{
    @IsOptional()
    @IsNotEmpty({ message: 'Поле пустое' })
    value:string

    @IsNumber()
    @Type(() => Number)
    user:number

    @IsNumber()
    @Type(() => Number)
    field:number

}

export class createFormDto{
    // @IsOptional()
    // @IsNotEmpty({ message: 'Поле пустое' })
    // fields_id:string

    @IsNumber()
    @Type(() => Number)
    team_id:number
}

export class createFormFieldsDto{

    // @IsNumber()
    // @Type(() => Number)
    @Type(() => Number)
    @IsNumber()
    form:Form

    @IsString()
    @IsNotEmpty({ message: 'Поле пустое' })
    title:string

    @IsBoolean()
    @Type(() => Boolean)
    required:boolean
}