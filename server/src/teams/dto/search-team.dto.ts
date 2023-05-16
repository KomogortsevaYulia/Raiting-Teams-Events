import { Transform } from "class-transformer";
import { IsOptional} from "class-validator";

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
}