import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form.entity";
import { UserForms } from "./user_forms.entity";

@Entity("form_field")
export class FormField {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string
    
    @OneToMany(()=>Form, (forms)=> forms.id)
    forms:Form

    @OneToMany(()=>UserForms, (fields)=> fields.id)
    fields:UserForms
}

