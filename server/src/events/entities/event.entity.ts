import { User } from '../../users/entities/user.entity';
import {
  Entity,
  ManyToOne,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Journal } from './journal.entity';
import { Dictionary } from '../../general/entities/dictionary.entity';
import { Achievement } from '../../users/entities/achievement.entity';

@Entity('events')
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ default: new Date() })
  date_update: Date;

  @ApiProperty()
  @Column({
    default: null,
    nullable: true,
  })
  dateStartRegistration: Date;

  @ApiProperty()
  @Column({
    default: null,
    nullable: true,
  })
  dateEndRegistration: Date;

  @ApiProperty()
  @Column({
    default: null,
    nullable: true,
  })
  dateStart: Date;

  @ApiProperty()
  @Column({
    default: null,
    nullable: true,
  })
  dateEnd: Date;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  plan: string; // план меропиятия

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  images: string[];

  @ApiProperty()
  @Column({ nullable: true })
  event_place: string; // место проведения

  // @ApiProperty()
  // @Column({
  //     type: "enum",
  //     enum: ["Коворгинг Г-2", "Конференц-зал Технопарк", "Коворкинг Студотрядов", "Актовый зал", "Спортзал"],
  //     default: null,
  //     nullable: true
  // })
  // location: string // целевая аудитория

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  tags: string[]; // теги

  @ApiProperty()
  @Column({ nullable: true })
  control: string; // контроль

  //плановое кол-во участников
  @ApiProperty()
  @Column('int', { nullable: true })
  count_people: number; // плановое кол-во участников

  @ApiProperty()
  @Column('int', { nullable: true })
  team_size: number; // плановое кол-во участников

  // @ApiProperty()
  // @Column({ nullable: true })
  // target_audience: string // целевая аудитория

  @ApiProperty()
  @Column({ nullable: true })
  phone: string; // телефон

  @ApiProperty()
  @Column({ nullable: true })
  email: string; // почта

  @ApiProperty()
  @Column({ nullable: true })
  event_goal: string; // почта

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  social_links: string[]; //соц сети

  @ApiProperty()
  @OneToMany(() => Journal, (journal) => journal.event, { cascade: true })
  journal: Journal[]; // журнал

  @ApiProperty()
  @OneToMany(() => Achievement, (achievement) => achievement.event, {
    cascade: true,
  })
  achievement: Achievement;

  // creator
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn([{ name: 'user_id' }])
  user: User;

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'status_id' }])
  status: Dictionary; // формат проведения

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'type_id' }])
  type: Dictionary; // тип (внеш, внут)

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'level_id' }])
  level: Dictionary; // уровень (вуз, межрег)

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'direction_id' }])
  direction: Dictionary; // направление

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'type_participation_id' }])
  type_participation: Dictionary; // вид участия

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'format_id' }])
  format: Dictionary; // формат проведения

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'clarifying_direction_id' }])
  clarifying_direction: Dictionary; // уточнающее направление

  @ApiProperty()
  @ManyToOne(() => Dictionary, (dict) => dict.id)
  @JoinColumn([{ name: 'character_event_id' }])
  character_event: Dictionary; // характер мероприятия
}
