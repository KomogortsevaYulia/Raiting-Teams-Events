
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { FormField } from "./form_field.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("user_forms")
export class UserForms {

    @ApiProperty() 
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty() 
    @PrimaryColumn()
    date: Date

    @ApiProperty() 
    @Column()
    value: string

    @ManyToOne(()=>FormField, (fields)=> fields.id)
    @JoinColumn([{ name: "field_id" }])
    field:FormField[]

 
    @ManyToOne(()=>User, (user)=> user.id)
    @JoinColumn([{ name: "user_id" }])
    user:User
}
