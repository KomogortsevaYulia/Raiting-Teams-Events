import { User } from "../../users/entities/user.entity"
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";

@Entity('events')
export class Event {
   
    @ApiProperty()
    @PrimaryColumn()
    id: number
   
    @ApiProperty()
    @ApiProperty() @Column()
    type: string

    @ApiProperty()
    @ApiProperty() @Column()
    title: string

    @ApiProperty()
    @ManyToOne((type) => User, (user) => user.id,)
    @JoinColumn([{ name: "users_id" }])
    users: number[]

    @ApiProperty()
    @ApiProperty() @Column()
    dateStart: Date

    @ApiProperty()
    @ApiProperty() @Column()
    dateEnd: Date

    @ApiProperty()
    @ApiProperty() @Column()
    description: string

    @ApiProperty()
    @ApiProperty() @Column()
    image: string

    @ApiProperty()
    @ApiProperty() @Column()
    size: string

    @ApiProperty()
    @ApiProperty() @Column()
    repeat: boolean

    @ApiProperty()
    @Column("simple-array")
    tags: string[]
}

