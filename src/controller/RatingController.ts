import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Rating} from "../entity/Rating";

export class RatingController {

    private ratingRepository = getRepository(Rating);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.ratingRepository.find({ relations: ["user"] });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.ratingRepository.findOneById(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.ratingRepository.save(request.body);
    }
}