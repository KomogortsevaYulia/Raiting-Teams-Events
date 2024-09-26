import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity('cabinets')
export class Cabinets {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToOne(() => Team, (team) => team.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'id_direction' }])
  direction: Team;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  tags: string[]; // теги

  // @OneToMany(() => CabinetsTime, (cabinetsTime) => cabinetsTime.cabinet, {
  //   cascade: true,
  // })
  // cabinetsTime: CabinetsTime[];
}
