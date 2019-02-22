import {Response} from "express";

export enum ErrorCode {
    NotFound = 404,
    BadRequest = 400,
    InternalServerError = 500,
    Unauthorized = 401


}

export class ErrorHandler {

    static handleError(response: Response, code: ErrorCode, error: Error = null) {
        response.status(code);
        if (code == null) {
            response.status(ErrorCode.InternalServerError);
        }
        switch (code) {
            case ErrorCode.Unauthorized:
                return {code: code, message: "Unauthorized"};
            case ErrorCode.NotFound:
                return {code: code, message: "Not Found"};
            case ErrorCode.BadRequest:
                return {code: code, message: "Bad Request"};
            default:
                return {code: code, message: "Internal Server Error"};
        }
    }

}