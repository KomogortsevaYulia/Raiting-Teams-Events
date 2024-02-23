import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeamSchedule } from './schedule.entity';
import { CabinetsTime } from './cabinets-time.entity';

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

  @OneToMany(() => CabinetsTime, (cabinetsTime) => cabinetsTime.cabinet, {
    cascade: true,
  })
  cabinetsTime: CabinetsTime[];
}
