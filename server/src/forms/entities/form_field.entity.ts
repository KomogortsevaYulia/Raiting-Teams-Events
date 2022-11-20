
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form.entity";
import { UserForms } from "./user_forms.entity";

@Entity("form_fields")
export class FormField {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty() 
    @Column()
    title: string
    
    @OneToMany(()=>Form, (forms)=> forms.id)
    forms:Form

    @OneToMany(()=>UserForms, (fields)=> fields.field_id)
    fields:UserForms
}
