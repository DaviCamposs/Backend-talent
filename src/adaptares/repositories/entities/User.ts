import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
    })
    name: string

    @Column({
        unique: true,
        nullable: false
    })
    email: string
    
    @Column({
        nullable: false
    })
    password: string
}