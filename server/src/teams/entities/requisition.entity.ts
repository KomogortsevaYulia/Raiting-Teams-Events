import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RequisitionFields } from '../../forms/entities/requisition_fields.entity';
import { Dictionary } from '../../general/entities/dictionary.entity';
import { Team } from './team.entity';

@Entity('requisition')
export class Requisitions {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'user_id' }])
  user: User;

  @ApiProperty()
  @Column()
  fullname: string;

  @ApiProperty()
  @Column({ nullable: true })
  comment_leader: string;

  @ApiProperty()
  @CreateDateColumn({ default: () => 'now()' })
  date_create: Date;

  @ApiProperty()
  @UpdateDateColumn({ default: () => 'now()' })
  date_update: Date;

  @ApiProperty()
  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn([{ name: 'team_id' }])
  team: Team;

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'status_id' }])
  status: Dictionary;

  @ApiProperty()
  @OneToMany(
    () => RequisitionFields,
    (requisitionFields) => requisitionFields.requisition,
    { cascade: true },
  )
  requisition_fields: RequisitionFields[];
}
