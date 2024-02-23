import { ApiProperty } from '@nestjs/swagger';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Cabinets} from "./cabinets.entity";

@Entity('cabinets_time')
export class CabinetsTime {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({type:'time'})
  time_start: string;

  @ApiProperty()
  @Column({type:'time'})
  time_end: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    default: 'monday',
  })
  day_week: string;

  @ApiProperty()
  @Column({ default: true })
  repeat: boolean;

  @ManyToOne(() => Cabinets, (cab) => cab.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'id_cabinet' }])
  cabinet: Cabinets;
}
