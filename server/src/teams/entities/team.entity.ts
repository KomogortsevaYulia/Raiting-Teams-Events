import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    direction: string

    @Column()
    image: string

    @Column()
    creation_date: Date

}
