import { Team } from "src/teams/entities/team.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('functions')
export class Functions{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    type: string

    @ManyToMany(() => Team)
    @JoinTable()
    team_id: Team["id"]

}
