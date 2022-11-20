import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

}
