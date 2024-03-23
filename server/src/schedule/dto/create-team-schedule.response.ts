import { ApiProperty } from '@nestjs/swagger';
import { TeamSchedule } from '../entities/schedule.entity';

export class CreateTeamScheduleResponse {
  @ApiProperty({
    type: TeamSchedule,
  })
  teamSchedule: TeamSchedule;
}
