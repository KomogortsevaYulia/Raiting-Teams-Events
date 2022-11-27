import { Team } from "../../teams/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

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
    type: string

    @ApiProperty() 
    @ManyToOne(() => Team, (team) => team.id)
    @JoinColumn([{ name: "team_id" }])
    team: Team

}
