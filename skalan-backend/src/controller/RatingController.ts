import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Rating} from "../entity/Rating";
import {plainToClass} from "class-transformer";
import {ErrorCode, ErrorHandler} from "../helpers/ErrorHandler";

export class RatingController {

    private ratingRepository = getRepository(Rating);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.ratingRepository.find({ order: {date: "DESC"}, relations: ["user"] });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.ratingRepository.findOneById(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const rating = plainToClass(Rating, request.body as Rating);
            console.log(rating);
            rating.user = request.user;
            return this.ratingRepository.save(rating);
        } catch(error) {
            ErrorHandler.handleError(response, ErrorCode.InternalServerError, error);
        }
    }
}