import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Function } from "../../users/entities/function.entity";

@Entity("teams")
export class Team {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty() 
    @Column()
    title: string

    @ApiProperty() 
    @Column()
    creation_date: Date
    
    @ApiProperty() 
    @Column("simple-array")
    image: string[]

    @ApiProperty() 
    @Column("simple-array")
    tags: string[]

    @ApiProperty() 
    @Column()
    description: string
    
    @ManyToOne((type)=>Team, (team)=>team.id)
    @JoinColumn([{ name: "id_parent" }])
    id_parent:Team[]

    @ApiProperty() 
    @Column({
        type: "enum",
        enum: ["direction", "university", "teams"],
        default: "teams"
    })
    type_team: string

    @ApiProperty()
    @Column()
    shortname:string

    @OneToMany((type)=>Function, (func)=>func.team)
    @JoinColumn([{ name: "func_id" }])
    functions:Function[]
}
