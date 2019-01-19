import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, BeforeInsert} from "typeorm";
import {User} from "./User";
import {BaseEntity} from "./BaseEntity";


@Entity({name: "Ratings"})
export class Rating extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    grade: number;

    @Column({nullable: false, length: 300})
    what: string;

    @Column({nullable: false, length: 300})
    where: string;

    @Column({nullable: false, length: 300})
    imageUrl: string;

    @Column({length: 300})
    motivation: string;

    @Column({nullable: false})
    date: Date;

    @ManyToOne(type => User, user => user.ratings, {nullable: false})
    @JoinColumn({name: "username"})
    user: User;

    @BeforeInsert()
    public setDate () {
        this.date = new Date();
    }
}
