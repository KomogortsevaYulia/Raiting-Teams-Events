import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../../events/entities/event.entity';
import { Achievement } from '../../users/entities/achievement.entity';

@Entity('dictionary')
export class Dictionary {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  class_name: string;

  @ApiProperty()
  @Column({ nullable: true })
  class_id: number;

  //Event

  @OneToMany(() => Event, (event) => event.direction)
  directionE: Event[];

  @OneToMany(() => Event, (event) => event.level)
  level: Event[];

  @OneToMany(() => Event, (event) => event.type)
  typeE: Event[];

  @OneToMany(() => Event, (event) => event.type_participation)
  type_participation: Event[];

  @OneToMany(() => Event, (event) => event.format)
  format: Event[];

  @OneToMany(() => Event, (event) => event.clarifying_direction)
  clarifying_direction: Event[];

  @OneToMany(() => Event, (event) => event.character_event)
  character_event: Event[];

  // Achievement
  @OneToMany(() => Achievement, (achievement) => achievement.direction)
  directionA: Achievement[];

  @OneToMany(() => Achievement, (achievement) => achievement.status)
  status: Achievement[];

  @OneToMany(() => Achievement, (achievement) => achievement.type)
  typeA: Achievement[];
}
