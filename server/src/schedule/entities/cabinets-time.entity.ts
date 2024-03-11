import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cabinets } from './cabinets.entity';
import { TeamSchedule } from './schedule.entity';
import {Dictionary} from "../../general/entities/dictionary.entity";

@Entity('cabinets_time')
export class CabinetsTime {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'time' })
  time_start: string;

  @ApiProperty()
  @Column({ type: 'time' })
  time_end: string;

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'id_day_week' }])
  day_week: Dictionary;

  @ApiProperty()
  @Column({ default: true })
  repeat: boolean;

  @ManyToOne(() => Cabinets, (cab) => cab.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'id_cabinet' }])
  cabinet: Cabinets;

  @ManyToOne(() => TeamSchedule, (teamSchedule) => teamSchedule.id)
  @JoinColumn([{ name: 'id_team_schedule' }])
  team_schedule: TeamSchedule;
}
