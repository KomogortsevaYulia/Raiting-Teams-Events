
import { Team } from "../../teams/entities/team.entity"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FormField } from "./form_field.entity"

@Entity("forms")
export class Form {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    description: string

    @ManyToOne(()=>FormField, (fields)=> fields.id)
    @JoinColumn([{ name: "fields_id" }])
    fields:FormField []

    @ManyToOne(()=>Team, (team)=> team.id)
    @JoinColumn([{ name: "team_id" }])
    team:Team 
}

