import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { User } from '../../users/entities/user.entity';
import { TeamVisits } from './visits.entity';

@Entity('team_schedule')
export class TeamSchedule {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  date_start: Date;

  @ApiProperty()
  @Column({ nullable: true })
  date_end: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'id_user' }])
  user: User;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn([{ name: 'id_team' }])
  team: Team;

  @OneToMany(() => TeamVisits, (teamVisits) => teamVisits.team_schedule, {
    cascade: true,
  })
  team_visits: TeamVisits[];
}
