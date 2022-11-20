import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity,JoinColumn,ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserForms } from "../../forms/entities/user_forms.entity";
import { Role } from "./role.entity";

@Entity("users")
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ type: "int" })
    studnumber: number

    @ApiProperty()
    @ApiProperty() 
    @Column()
    fullname: string

    @ApiProperty()
    @ApiProperty() 
    @Column()
    email: string
    
    @ApiProperty() 
    @Column()
    education_group: string

    @ApiProperty() 
    @Column()
    institute: string

    @ApiProperty() 
    @Column()
    gender: string

    @ApiProperty() 
    @Column()
    phone: string

    @Column({ type: "date" })
    birthdate: string

    @ApiProperty() 
    @Column()
    type_time_study: string

    @ApiProperty()
    @Column("simple-array")
    permissions: string[]

    @OneToMany(()=>UserForms, (user_forms)=> user_forms.user_id)
    user_forms:UserForms

    @ApiProperty()
    @ManyToOne(()=>Role, (role)=> role.title)
    @JoinColumn([{ name: "title_role" }])
    title_role: string
}
