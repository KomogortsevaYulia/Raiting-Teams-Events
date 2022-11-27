
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("form_fields")
export class FormField {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty() 
    @Column()
    title: string
}
