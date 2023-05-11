import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
@Entity('requisition')
export class Requistions{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    User_id: number


    @ApiProperty() 
    @Column()
    questionnaire_id: number

    
    @ApiProperty() 
    @Column()
    status: string

    @ApiProperty() 
    @Column()
    dateCreate: Date

    @ApiProperty() 
    @Column()
    dateUpdate: Date

}