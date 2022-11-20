
import { Team } from "../../teams/entities/team.entity"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FormField } from "./form_field.entity"

@Entity("form")
export class Form {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date" })
    date: string

    @Column()
    description: string

    @ManyToOne(()=>FormField, (fields)=> fields.id)
    fields:FormField  

    @ManyToOne(()=>Team, (team)=> team.id)
    team:Team 
}

