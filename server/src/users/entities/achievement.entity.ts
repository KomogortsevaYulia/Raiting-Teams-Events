import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { Dictionary } from "../../general/entities/dictionary.entity"
import { Event } from "../../events/entities/event.entity"

@Entity('achievements')
export class Achievement {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column()
    points: number

    @ApiProperty()
    @Column({ type: "date" })
    date_get: string

    @ApiProperty()
    @Column({ type: "date" })
    date_add: string

    @ApiProperty()
    @Column()
    file: string

    @ApiProperty()
    @Column({ type: "date" })
    date_last_edit: string

    @ApiProperty()
    @Column({ type: "date" })
    date_status_changed: string

    @ApiProperty()
    @Column()
    comment: string

    @ApiProperty()
    @Column({default:false})
    need_in_rating: boolean

    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "direction_id" }])
    direction: Dictionary

    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "status_id" }])
    status: Dictionary

    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "type_id" }])
    type: Dictionary


    @ApiProperty()
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn([{ name: "user_id" }])
    user: User

    @ApiProperty()
    @ManyToOne(() => Event, (event) => event.id)
    @JoinColumn([{ name: "event_id" }])
    event: Event
}