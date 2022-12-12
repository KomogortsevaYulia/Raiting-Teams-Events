
import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, } from "typeorm"

@Entity("roles")
export class Role {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    title: string
    
    @ApiProperty()
    @Column("simple-array")
    permissions: string[]

}





