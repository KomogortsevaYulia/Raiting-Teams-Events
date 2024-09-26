import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormField } from './form_field.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Requisitions } from '../../teams/entities/requisition.entity';

@Entity('requisition_fields')
export class RequisitionFields {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  value: string;

  @ManyToOne(() => FormField, (form_field) => form_field.id, { cascade: true })
  @JoinColumn([{ name: 'form_fields_id' }])
  form_field: FormField;

  @ManyToOne(() => Requisitions, (requisition) => requisition.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'requisition_id' }])
  requisition: Requisitions;
}
