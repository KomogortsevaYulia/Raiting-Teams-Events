import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsOptional, isArray} from "class-validator";

export class SearchTeamDto {

    @Transform(({ value }) => value.toLowerCase())
    @IsOptional()
    title: string;

    @Transform(({ value }) => value.toLowerCase())
    @IsOptional()
    tags: string;

    @Transform(({ value }) =>value.toLowerCase())
    @IsOptional()
    description: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({value}) => value==='true')
    is_archive: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({value}) => value==='true')
    set_open: boolean;

    //id parent
    @IsOptional()
    @IsArray()
    //@IsNumber()
    // @Type(() => Number)
    // @Transform(({ value }) =>value.split(","))
    directions: number[];

    @IsNumber()
    @Type(() => Number)
    limit: number;

    @IsNumber()
    @Type(() => Number)
    offset: number;

}