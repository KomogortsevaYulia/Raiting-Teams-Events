
import { Entity} from "typeorm"
import { IsDate, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@Entity('events')
export class SearchEvent {

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    id:number

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    type:number

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    level:number

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    direction:number

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateStart:Date

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateEnd:Date

    @IsOptional()
    title:string

    @IsOptional()
    tags:string

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit:number

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    offset:number
}


