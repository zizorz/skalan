import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from "typeorm";
import {Rating} from "./Rating";

@Entity({name: "Users"})
export class User {

    @PrimaryColumn({unique: true})
    userName: string;

    @Column({length: 60})
    password: string;

    @OneToMany(type => Rating, rating => rating.user)
    ratings: Rating[];
}
