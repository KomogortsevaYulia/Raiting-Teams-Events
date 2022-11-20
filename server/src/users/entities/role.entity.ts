import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    title: string

    @Column()
    permission: string


}





