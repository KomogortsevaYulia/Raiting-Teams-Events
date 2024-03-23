import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity('team_photo')
export class TeamPhoto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @CreateDateColumn({ default: () => 'now()' })
  creation_date: Date;

  @ManyToOne(() => Team, (team) => team.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'id_team' }])
  team: Team;
}
