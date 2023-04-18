import { User } from "../../users/entities/user.entity"
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";
import { Journal } from "./journal.entity";
import { Direction, Level, Type } from "../enums/enums";
import { Dictionary } from "../../general/entities/dictionary.entity";

@Entity('events')
export class Event {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

  

    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column({
        default: null,
        nullable: true
    })
    dateStartRegistration: Date

    @ApiProperty()
    @Column({
        default: null,
        nullable: true
    })
    dateEndRegistration: Date

    @ApiProperty()
    @Column({
        default: null,
        nullable: true
    })
    dateStart: Date

    @ApiProperty()
    @Column({
        default: null,
        nullable: true
    })
    dateEnd: Date

    @ApiProperty()
    @Column({nullable: true})
    description: string

    @ApiProperty()
    @Column( {nullable: true})
    plan: string

    @ApiProperty()
    @Column("simple-array", {nullable: true})
    images: string[]

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Коворгинг Г-2", "Конференц-зал Технопарк", "Коворкинг Студотрядов", "Актовый зал", "Спортзал"],
        default: null,
        nullable: true
    })
    location: string

   
    @ApiProperty()
    @Column("simple-array", {nullable: true})
    tags: string[]

    @ApiProperty()
    @Column({ nullable: true })
    control: string

    //плановое кол-во участников
    @ApiProperty()
    @Column('int',{ nullable: true })
    count_people: number

    @ApiProperty()
    @Column({ nullable: true })
    target_audience: string




    @OneToMany((type)=>Journal, (journal)=>journal.event)
    journal:Journal[]

    
    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "type_id" }])
    type: Dictionary

    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "level_id" }])
    level: Dictionary

    
    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "direction_id" }])
    direction: Dictionary

    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "type_participation_id" }])
    type_participation: Dictionary

    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "format_id" }])
    format: Dictionary

    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "clarifying_direction_id" }])
    clarifying_direction: Dictionary

    @ApiProperty()
    @ManyToOne(() => Dictionary, (dict) => dict.id)
    @JoinColumn([{ name: "character_event_id" }])
    character_event: Dictionary
}

