import {classToPlain} from "class-transformer";


export class BaseEntity {

    public toJSON() {
        return classToPlain(this);
    }

}