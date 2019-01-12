import {Entity, Column, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import {Rating} from "./Rating";
import * as bcrypt from "bcrypt";
import {Constants} from "../Constants";
import {Exclude} from "class-transformer";
import {BaseEntity} from "./BaseEntity";

@Entity({name: "Users"})
export class User extends BaseEntity {

    @PrimaryColumn({unique: true})
    userName: string;

    @Exclude()
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
