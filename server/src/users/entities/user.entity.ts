import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stud_number: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  gender: string;

  @Column()
  institute: string;
}