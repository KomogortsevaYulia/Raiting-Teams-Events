
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { FormField } from "./form_field.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Requisitions } from "../../teams/entities/requisition.entity";

@Entity("requisition_fields")
export class RequisitionFields {

    @ApiProperty() 
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty() 
    @Column()
    value: string

    @ManyToOne(()=>FormField, (fields)=> fields.id)
    @JoinColumn([{ name: "form_fields_id" }])
    field:FormField[]

 
    @ManyToOne(()=>Requisitions, (requisition)=> requisition.id)
    @JoinColumn([{ name: "requisition_id" }])
    requisition:Requisitions
}
