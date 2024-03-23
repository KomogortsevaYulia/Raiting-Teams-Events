import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserFunction } from './user_function.entity';
import * as argon2 from 'argon2';
import { Journal } from '../../events/entities/journal.entity';
import { Requisitions } from '../../teams/entities/requisition.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true, default: '123', unique: true })
  username: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  studnumber: number;

  @ApiProperty()
  @Column({ nullable: true })
  fullname: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  education_group: string;

  @ApiProperty()
  @Column({ nullable: true })
  institute: string;

  @ApiProperty()
  @Column({ nullable: true })
  gender: string;

  @ApiProperty()
  @Column({ nullable: true })
  phone: string;

  @ApiProperty()
  @Column({ nullable: true, default: '123' })
  password: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  birthdate: string;

  @ApiProperty()
  @Column({ nullable: true })
  type_time_study: string;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  permissions: string[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  course: number;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  bitrix_id: number;

  @OneToMany(() => UserFunction, (user_func) => user_func.function, {
    cascade: true,
  })
  user_function: UserFunction[];

  @OneToMany(() => Journal, (journal) => journal.user, { cascade: true })
  journal: Journal[];

  @OneToMany(() => Requisitions, (requisition) => requisition.user, {
    cascade: true,
  })
  requisition: Requisitions[];

  @ApiProperty()
  @OneToMany(() => Event, (event) => event.user, { cascade: true })
  events: Event[];

  // @OneToMany(() => TeamSchedule, (team_schedule) => team_schedule.user, {
  //   cascade: true,
  // })
  // team_schedules: TeamSchedule[];

  // @OneToMany(() => TeamVisits, (team_visits) => team_visits.user, {
  //   cascade: true,
  // })
  // team_visits: TeamVisits[];

  // use it as object class in classes
  userId: number;
}
