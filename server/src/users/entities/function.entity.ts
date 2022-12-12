import { Team } from "../../teams/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserFunction } from "./user_function.entity";
import { Role } from "./role.entity";

@Entity('functions')
export class Function {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column({
        type: "enum",
        enum: ["general", "special"],
        default: "special"
    })
    type_function: string

    @ApiProperty()
    @ManyToOne(() => Team, (team) => team.id)
    @JoinColumn([{ name: "team_id" }])
    team: Team

    @ApiProperty()
    @ManyToOne((type) => Role, (role) => role.id)
    role_id:number

    @OneToMany((type) => UserFunction, (uf) => uf.function)
    userFunctions: UserFunction[]
}
