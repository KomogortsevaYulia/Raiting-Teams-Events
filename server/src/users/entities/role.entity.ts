import { Column, Entity, OneToMany, PrimaryColumn, } from "typeorm"
import { User } from "./user.entity"

@Entity("roles")
export class Role {
    @PrimaryColumn()
    title: string

    @Column("simple-array")
    permissions: string[]

    @OneToMany(() => User, (user) => user.id)
    user: User
}





