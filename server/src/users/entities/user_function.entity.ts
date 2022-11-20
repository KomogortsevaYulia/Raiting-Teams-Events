import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Function } from "./function.entity";

@Entity('user_functions')
export class UserFunction {

    @PrimaryColumn()
    function_id: number

    @ManyToOne((type) => Function, (func) => func.id)
    @JoinColumn([{ name: "function_id" }])
    function: number

    @PrimaryColumn()
    user_id: number

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn([{ name: "user_id" }])
    user: number

    @Column()
    dateStart: Date

    @Column()
    dateEnd: Date

}
