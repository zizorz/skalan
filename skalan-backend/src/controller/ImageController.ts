import {NextFunction, Request, Response} from "express";
import {ErrorCode, ErrorHandler} from "../helpers/ErrorHandler";
import * as uuidv1 from "uuid/v1";

export class ImageController {

    async upload(request: Request, response: Response, next: NextFunction) {

        const file = request.files && request.files.image;
        if (!file) {
            return ErrorHandler.handleError(response, ErrorCode.BadRequest);
        }

        try {
            const result = await this.saveFile(file);
            return {filename: result};
        } catch (err) {
            return ErrorHandler.handleError(response, ErrorCode.InternalServerError, err);
        }
    }

    private saveFile(file): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const filename = `${uuidv1()}.jpg`;
            const path = `${process.cwd()}/images/${filename}`;
            file.mv(path, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(filename);
            });
        });
    }
}