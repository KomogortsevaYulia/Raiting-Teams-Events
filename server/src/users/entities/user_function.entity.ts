import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Function } from "./function.entity";

@Entity('user_functions')
export class UserFunction {

    @PrimaryColumn()
    @ManyToOne((type) => Function, (func) => func.id)
    function: number

    @PrimaryColumn()
    @ManyToOne((type) => User, (user) => user.id)
    user: number

    @Column({ type: "date" })
    dateStart: string

    @Column({ type: "date" })
    dateEnd: string

}
