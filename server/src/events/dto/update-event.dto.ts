import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEventDto  {

    @IsOptional()
    @IsBoolean()
    status: boolean // статус
  
}
