import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { Dictionary } from 'src/general/entities/dictionary.entity';
export class CreateEventDto {
  @IsNotEmpty({ message: 'Поле пустое' })
  @Length(1, 100, {
    message: 'Название, максимальная длина текста 50',
  })
  title: string;
  @Length(1, 1000, {
    message: 'Описание, максимальная длина текста 1000',
  })
  description: string;

  @IsDateString()
  dateStart: Date;

  @IsDateString()
  dateEnd: Date;
  // functions:Function[]

  @IsDateString()
  dateStartRegistration: Date;

  @IsDateString()
  dateEndRegistration: Date;

  // @IsBoolean()
  // status: string // статус

  @IsNumber()
  @Type(() => Number)
  count_people: number;

  @IsNumber()
  @Type(() => Number)
  team_size: number;

  @Length(1, 1000, {
    message: 'Описание, максимальная длина текста 1000',
  })
  tags: string[];

  @Length(1, 1000, {})
  event_place: string; // место проведения

  @Length(1, 1000, {})
  event_goal: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Ссылка на документ пустая' })
  plan: string;

  @Length(1, 1000, {})
  control: string;

  @Length(1, 1000, {})
  email: string;

  @Length(1, 1000, {})
  phone: string;

  @Length(1, 1000, {})
  social_links: string[];

  @Length(1, 1000, {})
  level: Dictionary;

  @IsNumber()
  @Type(() => Number)
  type: Dictionary;

  @Length(1, 1000, {})
  direction: Dictionary;

  @Length(1, 1000, {})
  type_participation: Dictionary;

  @Length(1, 1000, {})
  format: Dictionary;

  @Length(1, 1000, {})
  clarifying_direction: Dictionary;

  @Length(1, 1000, {})
  character_event: Dictionary;
}
