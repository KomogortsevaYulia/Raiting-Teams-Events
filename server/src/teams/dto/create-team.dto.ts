import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Team } from '../entities/team.entity';
import { Type } from 'class-transformer';

export class CreateTeamDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id_parent: Team;

  @IsNotEmpty({ message: 'Поле пустое' })
  @IsString()
  @Length(1, 100, {
    message: 'Название коллектива, максимальная длина текста 1-100',
  })
  title: string;

  @IsNotEmpty({ message: 'Поле пустое' })
  @Length(1, 3000, {
    message: 'Описание, максимальная длина текста 1-3000',
  })
  description: string;

  @IsNotEmpty({ message: 'Поле пустое' })
  @Length(1, 50, {
    message: 'Краткое название, максимальная длина текста 1-50',
  })
  shortname: string;

  @IsOptional()
  @IsArray()
  leaders: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cabinets: string[];

  @IsOptional()
  @IsNotEmpty({ message: 'Ссылка на документ пустая' })
  document: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Ссылка на устав пустая' })
  charterTeam: string;

  get cabinetsAsNumbers(): number[] {
    return this.cabinets.map((str) => parseInt(str));
  }
}
