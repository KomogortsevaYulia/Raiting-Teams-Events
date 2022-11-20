import { Column, Entity,JoinColumn,ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserForms } from "../../forms/entities/user_forms.entity";
import { Role } from "./role.entity";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    studnumber: number

    @Column()
    fullname: string

    @Column()
    email: string
    
    @Column()
    education_group: string

    @Column()
    institute: string

    @Column()
    gender: string

    @Column()
    phone: string

    @Column({ type: "date" })
    birthdate: string

    @Column()
    type_time_study: string

    @Column("simple-array")
    permissions: string[]

    @OneToMany(()=>UserForms, (user_forms)=> user_forms.user_id)
    user_forms:UserForms

    @ManyToOne(()=>Role, (role)=> role.title)
    @JoinColumn([{ name: "title_role" }])
    title_role: string
}

