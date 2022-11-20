import { Team } from "../../teams/entities/team.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('functions')
export class Function{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    type: string

    @ManyToOne(() => Team, (team) =>team.id)
    team: Team

}
