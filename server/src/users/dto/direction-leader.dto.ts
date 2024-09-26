import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class AssignDirectionTeamLeaderDto {
  @IsNotEmpty({ message: 'usrIds Поле пустое' })
  @IsArray()
  userIds: number[];

  @IsNotEmpty({ message: 'teamId Поле пустое' })
  @IsNumber()
  teamId: number;

  roleName: string;
}
