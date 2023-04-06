import { User } from "../../users/entities/user.entity"
import { Event } from "../../events/entities/event.entity"
import { Team } from "../../teams/entities/team.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";



@Entity('journals')
export class Journal {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({
        default: null,
        nullable: true
    })
    dateRegistration: Date

    @ApiProperty()
    @Column({
        default: null,
        nullable: true
    })
    dateParticipation: Date

    @ApiProperty()
    @Column({nullable: true})
    comment: string
    
    @ApiProperty()
    @Column({nullable: true})
    qr_code: string

    @ApiProperty()
    @Column({default:false})
    is_uchastnik: boolean

    @ApiProperty()
    @Column({default:false})
    is_organizator: boolean

    @ApiProperty()
    @Column({default:false})
    is_qr_controller: boolean

    @ApiProperty()
    @Column({default:false})
    is_can_set_results: boolean

    @ApiProperty()
    @Column({default:false})
    is_registered: boolean

    @ApiProperty()
    @Column({default:false})
    is_participation: boolean

    @ManyToOne((type) => Event, (event) => event.id)
    @JoinColumn([{ name: "event_id" }])
    @Column({nullable:true})
    event: number
    
    @ManyToOne((type) => Team, (team) => team.id)
    @JoinColumn([{ name: "team_id" }])
    @Column({nullable:true})
    team: number

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn([{ name: "user_id" }])
    @Column({nullable:true})
    user: number

    @ApiProperty()
    @Column({nullable:true})
    result_place:number
}

