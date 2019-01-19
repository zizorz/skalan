import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {NextFunction, Request, Response} from "express";
import * as bcrypt from "bcrypt";

export class LoginController {

    private userRepository = getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
        const username = request.body && request.body.username;
        const password = request.body && request.body.password;

        const user = await this.userRepository.findOneById(username);
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return user;
        }
    }
}