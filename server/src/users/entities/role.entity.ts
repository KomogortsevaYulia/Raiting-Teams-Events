import { Column, Entity, PrimaryColumn, } from "typeorm"

@Entity("roles")
export class Role {
    @PrimaryColumn()
    title: string

    @Column()
    permission: string


}





