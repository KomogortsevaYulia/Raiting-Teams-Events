import { Team } from '../../teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserFunction } from './user_function.entity';

@Entity('functions')
export class TeamFunction {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['general', 'special'],
    default: 'special',
  })
  type_function: string;

  @ApiProperty()
  @ManyToOne(() => Team, (team) => team.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'team_id' }])
  team: Team;

  @OneToMany(() => UserFunction, (uf) => uf.function, { cascade: true })
  userFunctions: UserFunction[];
}
