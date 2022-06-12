import { NextFunction, Request, Response } from "express";
import { EmailAlreadyRegisteredError } from "../../../domain/errors/EmailAlreadyRegisteredError";
import { InvalidEmailError } from "../../../domain/errors/InvalidEmailError";
import { NameTooShortError } from "../../../domain/errors/NameTooShortError";
import { PasswordTooShortError } from "../../../domain/errors/PasswordTooShortError";
import { WrongCredentialsError } from "../../../domain/errors/WrongCredentialsError";
import { ValidationError } from "../controllers/errors/ValidationError";

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {

    if (error instanceof WrongCredentialsError) {
        return response.status(403).json({
            title: 'Not authorized',
            message: 'Verify your credentials'
        })
    } 
    else if (error instanceof EmailAlreadyRegisteredError ) {
        return response.status(200).json({
            title: 'Validation Error',
            message: 'E-mail already registered'
        })
    }
    else if (error instanceof PasswordTooShortError ||
        error instanceof InvalidEmailError ||
        error instanceof NameTooShortError ||
        error instanceof ValidationError) {
        return response.status(400).json({
            title: 'Validation error',
            message: 'Request body is invalid'
        })
    } else {
        response.status(500).json({
            title: "InternalServerError",
            message: "Something went wrong",
        })
    }
}