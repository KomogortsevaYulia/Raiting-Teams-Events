import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormField } from "./form_field.entity";

@Entity("user_forms")
export class UserForms {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date" })
    date: number

    @Column()
    value: string

    @ManyToOne(()=>FormField, (fields)=> fields.id)
    fields:FormField[]
 
    @ManyToOne(()=>User, (user)=> user.id)
    user:User
}

