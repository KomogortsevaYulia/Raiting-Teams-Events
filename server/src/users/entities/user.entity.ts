import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity,JoinColumn,ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @Column()
    fullname: string

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

    @ApiProperty()
    @ManyToOne(()=>Role, (role)=> role.title)
    @JoinColumn([{ name: "title_role" }])
    title_role: string
}
