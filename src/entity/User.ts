import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Rating} from "./Rating";

@Entity({name: "Users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(type => Rating, rating => rating.user)
    ratings: Rating[];
}
