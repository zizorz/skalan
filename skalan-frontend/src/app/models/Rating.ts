import { User } from './User';

export class Rating {
    id: number;
    grade: number;
    what: string;
    where: string;
    motivation: string;
    user: User;
}
