import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Form } from './form.entity';
import { RequisitionFields } from './requisition_fields.entity';

@Entity('form_fields')
export class FormField {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ default: false })
  required: boolean;

  @ApiProperty()
  @Column({ default: false })
  archive: boolean;

  @OneToMany(() => RequisitionFields, (req_fields) => req_fields.form_field, {
    onDelete: 'CASCADE',
  })
  requisition_field: RequisitionFields[];

  @ApiProperty()
  @ManyToOne(() => Form, (form) => form.id, { cascade: true })
  @JoinColumn([{ name: 'form_id' }])
  form: Form;
}
