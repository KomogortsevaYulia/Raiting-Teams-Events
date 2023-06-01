
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form.entity";

@Entity("form_fields")
export class FormField {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty() 
    @Column()
    title: string

    @ApiProperty() 
    @Column({default:false})
    required: boolean

    @ApiProperty() 
    @Column({default:false})
    archive: boolean

    @ApiProperty()
    @ManyToOne(()=>Form, (form)=> form.id)
    @JoinColumn([{ name: "form_id" }])
    form:Form
    
}
