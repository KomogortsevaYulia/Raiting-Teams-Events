import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamSchedule } from './schedule.entity';

@Entity('cabinets')
export class Cabinets {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => TeamSchedule, (schedule) => schedule.cabinet, {
    cascade: true,
  })
  team_schedule: TeamSchedule[];
}
