import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';
import { Team } from '../entities/team.entity';

export class UpdateTeamDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id_parent: Team;

  @IsNotEmpty({ message: 'Поле пустое' })
  @Length(1, 100, {
    message: 'Название коллкетива, максимальная длина текста 100',
  })
  title: string;

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
  @IsNumber()
  @Type(() => Number)
  oldLeaderId: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  newLeaderId: number;

  @IsOptional()
  @Length(1, 50, {
    message: 'Кабинет, максимальная длина текста 50',
  })
  cabinet: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Ссылка на документ пустая' })
  @Length(1, 300, {
    message: 'Ссылка на документ, максимальная длина текста 300',
  })
  document: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Ссылка на устав пустая' })
  @Length(1, 300, {
    message: 'ССсылка на устав, максимальная длина текста 300',
  })
  charterTeam: string;
}
