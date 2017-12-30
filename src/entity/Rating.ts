import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from "typeorm";
import {User} from "./User";

@Entity({name: "Ratings"})
export class Rating {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    grade: number;

    @Column({nullable: false, length: 300})
    what: string;

    @Column({nullable: false, length: 300})
    where: string;

    @Column({length: 300})
    motivation: string;

    @ManyToOne(type => User, user => user.ratings, {nullable: false})
    @JoinColumn({name: "userName"})
    user: User;
}
