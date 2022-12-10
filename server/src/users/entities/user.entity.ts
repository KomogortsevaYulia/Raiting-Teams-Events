import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity,JoinColumn,ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import * as argon2 from 'argon2';

@Entity("users")
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @ApiProperty()
    @Column({ type: "int" , nullable: true })
    studnumber: number

    @ApiProperty()
    @Column({ nullable: true })
    fullname: string

    @ApiProperty()
    @Column()
    email: string
    
    @ApiProperty() 
    @Column({ nullable: true })
    education_group: string

    @ApiProperty() 
    @Column({ nullable: true })
    institute: string

    @ApiProperty() 
    @Column({ nullable: true })
    gender: string

    @ApiProperty() 
    @Column({ nullable: true })
    phone: string

    @ApiProperty() 
    @Column()
    password: string

    @Column({ type: "date" , nullable: true })
    birthdate: string

    @ApiProperty() 
    @Column({ nullable: true })
    type_time_study: string

    @ApiProperty()
    @Column("simple-array",{ nullable: true })
    permissions: string[]

    @ApiProperty()
    @ManyToOne(()=>Role, (role)=> role.title)
    @JoinColumn([{ name: "title_role" }])
    title_role: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
}
