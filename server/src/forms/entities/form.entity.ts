
import { Team } from "../../teams/entities/team.entity"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { FormField } from "./form_field.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity("forms")
export class Form {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty() 
    @Column()
    date: Date

    @ApiProperty() 
    @Column()
    description: string

    @ApiProperty()
    @Column("simple-array")
    fields_id:number []

    @ApiProperty()
    @ManyToOne(()=>Team, (team)=> team.id)
    @JoinColumn([{ name: "team_id" }])
    team_id:number
}

