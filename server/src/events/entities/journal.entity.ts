import { User } from '../../users/entities/user.entity';
import { Event } from './event.entity';
import { Team } from '../../teams/entities/team.entity';
import {
  Entity,
  ManyToOne,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('journals')
export class Journal {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    default: null,
    nullable: true,
  })
  dateRegistration: Date;

  @ApiProperty()
  @Column({
    default: null,
    nullable: true,
  })
  dateParticipation: Date;

  @ApiProperty()
  @Column({ nullable: true })
  comment: string;

  @ApiProperty()
  @Column({ nullable: true })
  qr_code: string;

  @ApiProperty()
  @Column({ default: false })
  is_uchastnik: boolean;

  @ApiProperty()
  @Column({ default: false })
  is_organizator: boolean;

  @ApiProperty()
  @Column({ default: false })
  is_qr_controller: boolean;

  @ApiProperty()
  @Column({ default: false })
  is_can_set_results: boolean;

  @ApiProperty()
  @Column({ default: false })
  is_registered: boolean;

  @ApiProperty()
  @Column({ default: false })
  is_participation: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  result_place: number;

  @ManyToOne(() => Event, (event) => event.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'event_id' }])
  event: Event;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn([{ name: 'team_id' }])
  team: Team;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'user_id' }])
  user: User;
}
