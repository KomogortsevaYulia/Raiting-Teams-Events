import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
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
    direction: string

    @ApiProperty() 
    @Column()
    image: string

    @ApiProperty() 
    @Column()
    creation_date: Date

    @OneToMany((type)=>Function, (func)=>func.team)
    @JoinColumn([{ name: "func_id" }])
    functions:Function[]

}
