import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { TeamFunction } from './function.entity';
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

  @ApiProperty()
  @CreateDateColumn({ default: () => 'now()' })
  dateCreate: Date;

  @ApiProperty()
  @UpdateDateColumn({ default: () => 'now()' })
  dateUpdate: Date;

  @ManyToOne(() => TeamFunction, (func) => func.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'function_id' }])
  function: TeamFunction;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id' }])
  user: User;
}
