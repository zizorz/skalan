import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import {Rating} from "./Rating";
import * as bcrypt from "bcrypt";
import {Constants} from "../Constants";

@Entity({name: "Users"})
export class User {

    @PrimaryColumn({unique: true})
    userName: string;

    @Column({length: 60})
    password: string;

    @OneToMany(type => Rating, rating => rating.user)
    ratings: Rating[];

    @BeforeUpdate()
    @BeforeInsert()
    public async hashPassword () {
        this.password = await bcrypt.hash(this.password, Constants.SALT_ROUNDS);
    }
}
