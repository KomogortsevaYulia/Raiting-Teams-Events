import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
}

