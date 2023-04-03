import { User } from "../../users/entities/user.entity"
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";
import { Journal } from "./journal.entity";
import { Level, Type } from "../enums/enums";

@Entity('events')
export class Event {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({
        type: "enum",
        enum: Type,
        default: null,
        nullable: true
    })
    type: string

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Пассивное", "Активное"],
        default: null,
        nullable: true
    })
    type_participation: string

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
    @Column({
        type: "enum",
        enum: Level,
        default: Level.UNIVERSITY,
        nullable: true
    })
    level: string

    @ApiProperty()
    @Column("simple-array", {nullable: true})
    tags: string[]

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Очное", "Онлайн", "Смешанное", "Выездное", "Заочное"],
        default: "Очное",
        nullable: true
    })
    format: string

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Культурно-массовая деятельность", "Общественная деятельность", "Научная деятельность", "Спортивная деятельность", "Учебная деятельность"],
        nullable: true
    })
    direction: string

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

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Гражданское", "Патриотическое", "Духовно - нравственное", "Физическое", "Экологическое",
            "Трудовое", "Культурно - просветительское", "Научно - образовательное", "Другое"],
        nullable: true
    })
    clarifying_direction: string

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Конференция", "Образовательное (soft-skills)", "Концерт", "Развлекательное","Соревнование"],
        nullable: true
    })
    character_event: string

    @OneToMany((type)=>Journal, (journal)=>journal.event)
    journal:Journal[]
}

