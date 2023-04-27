import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('requisition')
export class Requisitions{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    user_id: number

    @ApiProperty() 
    @Column()
    questionnaire_id: number

    @ApiProperty() 
    @Column()
    fullname: string

    @ApiProperty() 
    @Column()
    status: string

    @ApiProperty() 
    @Column()
    date_create: Date

    @ApiProperty() 
    @Column()
    date_update: Date

}