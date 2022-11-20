import { Team } from "../../teams/entities/team.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('functions')
export class Function {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({
        type: "enum",
        enum: ["general", "special"],
        default: "special"
    })
    type: string

    @ManyToOne(() => Team, (team) => team.id)
    team: Team

}
