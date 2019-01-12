import {classToPlain} from "class-transformer";


export abstract class BaseEntity {

    public toJson() {
        return classToPlain(this);
    }
}
