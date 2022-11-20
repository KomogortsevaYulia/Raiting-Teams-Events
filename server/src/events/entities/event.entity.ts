import { User } from "../../users/entities/user.entity"
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm"

@Entity('events')
export class Event {
   
    @PrimaryColumn()
    id: number
   
    @Column()
    type: string

    @Column()
    title: string

    @ManyToOne((type) => User, (user) => user.id,)
    @JoinColumn([{ name: "users_id" }])
    users: number[]

    @Column()
    dateStart: Date

    @Column()
    dateEnd: Date

    @Column()
    description: string

    @Column()
    image: string

    @Column()
    size: string

    @Column()
    repeat: boolean

    @Column("simple-array")
    tags: string[]
}

