import { Column, Entity,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserForms } from "../../forms/entities/user_forms.entity";

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
    permission: string[]

    @OneToMany(()=>UserForms, (user_forms)=> user_forms.id)
    user_forms:UserForms
}

