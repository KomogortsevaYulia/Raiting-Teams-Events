import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";
import {Event} from '../../events/entities/event.entity'

@Entity('dictionary')
export class Dictionary {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string

    // @OneToMany((type)=>Journal, (journal)=>journal.event)
    // journal:Journal[]

    @OneToMany(() => Event, (event) => event.direction)
    direction: Event[]

    @OneToMany(() => Event, (event) => event.level)
    level: Event[]

    @OneToMany(() => Event, (event) => event.type)
    type: Event[]

    @OneToMany(() => Event, (event) => event.type_participation)
    type_participation: Event[]

    @OneToMany(() => Event, (event) => event.format)
    format: Event[]

    @OneToMany(() => Event, (event) => event.clarifying_direction)
    clarifying_direction: Event[]

    @OneToMany(() => Event, (event) => event.character_event)
    character_event: Event[]
}

 