import { User } from "../../users/entities/user.entity"
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";

@Entity('events')
export class Event {
   
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number
   
    @ApiProperty()
    @Column()
    type: string

    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column("simple-array")
    users_id: number[]

    @ApiProperty()
    @Column()
    dateStart: Date

    @ApiProperty()
    @Column()
    dateEnd: Date

    @ApiProperty()
    @Column()
    description: string

    @ApiProperty()
    @Column()
    image: string

    @ApiProperty()
    @Column()
    size: string

    @ApiProperty()
    @Column()
    repeat: boolean

    @ApiProperty()
    @Column("simple-array")
    tags: string[]
}

