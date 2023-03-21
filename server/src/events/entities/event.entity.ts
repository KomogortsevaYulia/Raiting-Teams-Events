import { User } from "../../users/entities/user.entity"
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";

@Entity('events')
export class Event {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ nullable: true })
    type: string

    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column()
    dateStartRegistration: Date

    @ApiProperty()
    @Column()
    dateEndRegistration: Date

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
    @Column("simple-array")
    images: string[]

    @ApiProperty()
    @Column()
    location: string

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Вузовский", "Городской", "Региональный"],
        default: "Вузовский",
        nullable: true
    })
    level: string


    @ApiProperty()
    @Column("simple-array")
    tags: string[]

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Очное", "Онлайн", "Смешанное", "Выездное", "Заочный"],
        default: "Очное",
        nullable: true
    })
    format: string

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["Культурно-массовая","Общественная", "Научная", "Спортивная", "Учебная"],
        default: "Очное",
        nullable: true
    })
    direction: string
}

