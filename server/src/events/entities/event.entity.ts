import { User } from "../../users/entities/user.entity"
import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm"

@Entity('events')
export class Event {
   
    @PrimaryColumn()
    id: number
   
    @Column()
    type: string

    @Column()
    title: string

    @ManyToOne((type) => User, (user) => user.id,)
    @Column("simple-array")
    id_users: number[]

    @Column({ type: "date" })
    dateStart: string

    @Column({ type: "date" })
    dateEnd: string

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

