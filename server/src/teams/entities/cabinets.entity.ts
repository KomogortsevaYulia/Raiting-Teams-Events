import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from "../../users/entities/user.entity";
import {Team} from "./team.entity";
import {TeamSchedule} from "./schedule.entity";
import {Journal} from "../../events/entities/journal.entity";

@Entity('cabinets')
export class Cabinets {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => TeamSchedule, (schedule) => schedule.cabinet, { cascade: true })
  team_schedule: TeamSchedule[];
}
