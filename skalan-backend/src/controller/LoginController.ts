import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {NextFunction, Request, Response} from "express";
import * as bcrypt from "bcrypt";
import {ErrorCode, ErrorHandler} from "../helpers/ErrorHandler";

export class LoginController {

    private userRepository = getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const username = request.body && request.body.username;
            const password = request.body && request.body.password;

            const user = await this.userRepository.findOneById(username);

            if (!user) {
                return ErrorHandler.handleError(response, ErrorCode.Unauthorized);
            }

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                return user;
            } else {
                return ErrorHandler.handleError(response, ErrorCode.Unauthorized)
            }
        } catch (error) {
            return ErrorHandler.handleError(response, ErrorCode.InternalServerError);
        }
    }
}