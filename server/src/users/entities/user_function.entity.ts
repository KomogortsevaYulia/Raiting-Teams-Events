import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Function } from "./function.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('user_functions')
export class UserFunction {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((type) => Function, (func) => func.id)
    @JoinColumn([{ name: "function_id" }])
    function: number

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn([{ name: "user_id" }])
    user: number

    @ApiProperty() 
    @Column()
    dateStart: Date

    @ApiProperty() 
    @Column()
    dateEnd: Date

}
