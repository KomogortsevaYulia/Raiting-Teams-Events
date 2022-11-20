
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { FormField } from "./form_field.entity";

@Entity("user_forms")
export class UserForms {

    @PrimaryColumn()
    date: Date

    @Column()
    value: string

    @PrimaryColumn()
    field_id: number[]

    @ManyToOne(()=>FormField, (fields)=> fields.id)
    @JoinColumn([{ name: "field_id" }])
    field:FormField[]

    @PrimaryColumn()
    user_id: number
 
    @ManyToOne(()=>User, (user)=> user.id)
    @JoinColumn([{ name: "user_id" }])
    user:User
}
