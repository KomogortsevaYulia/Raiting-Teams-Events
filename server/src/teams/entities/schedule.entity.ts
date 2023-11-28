import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Team } from './team.entity';
import { Cabinets } from './cabinets.entity';

@Entity('team_schedule')
export class TeamSchedule {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  dateStart: Date;

  @ApiProperty()
  @Column()
  dateEnd: Date;

  @ManyToOne(() => Cabinets, (cabinet) => cabinet.id)
  @JoinColumn([{ name: 'id_cabinet' }])
  cabinet: Cabinets;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'id_user' }])
  user: User;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn([{ name: 'id_team' }])
  team: Team;
}
