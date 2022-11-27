
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, } from "typeorm"

@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column("simple-array")
    permissions: string[]

}





