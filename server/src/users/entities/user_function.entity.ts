import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Function } from './function.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_functions')
export class UserFunction {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  dateStart: Date;

  @ApiProperty()
  @Column({ nullable: true })
  dateEnd: Date;

  @ManyToOne((type) => Function, (func) => func.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'function_id' }])
  function: Function;

  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id' }])
  user: User;
}
