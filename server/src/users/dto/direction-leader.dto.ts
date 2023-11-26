import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignDirectionTeamLeaderDto {
  @IsNotEmpty({ message: 'usrId Поле пустое' })
  @IsNumber()
  userId: number;

  @IsNotEmpty({ message: 'teamId Поле пустое' })
  @IsNumber()
  teamId: number;

  roleName: string;
}
