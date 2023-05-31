import { ApiProperty } from "@nestjs/swagger"
import { Form } from "../../forms/entities/form.entity"
import { User } from "../../users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RequisitionFields } from "../../forms/entities/requisition_fields.entity"

@Entity('requisition')
export class Requisitions {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn([{ name: "user_id" }])
    user_id: User

    @ManyToOne(() => Form, (form) => form.id)
    @JoinColumn([{ name: "form_id" }])
    form_id: Form

    @ApiProperty()
    @Column()
    fullname: string

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["создана", "принята", "отклонена"],
        default: "создана",
        nullable: true
    })
    status: string

    @ApiProperty()
    @Column()
    date_create: Date

    @ApiProperty()
    @Column()
    date_update: Date

    @ManyToOne(()=>Requisitions, (requisition)=> requisition.id)
    @JoinColumn([{ name: "requisition_id" }])
    requisition:Requisitions

    @OneToMany((type) => RequisitionFields, (requisitionFields) => requisitionFields.requisition)
    @JoinColumn([{ name: "requisition_fields_id" }])
    requisitionFields: RequisitionFields[]
}