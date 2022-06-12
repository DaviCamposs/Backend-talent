import { NextFunction, Request, Response } from "express";
import { RegisterUser } from "../../../domain/ports/in/RegisterUser";
import { ValidationError } from "./errors/ValidationError";

export class RegisterUserController {
    constructor(private registerUserUseCase: RegisterUser) { }

    execute = async (request: Request, response: Response, next: NextFunction) => {
        try {

            const name = request.body?.name
            const email = request.body?.email
            const password = request.body?.password

            if (!name || !email || !password)
                throw new ValidationError()

            await this.registerUserUseCase.register(name, email, password)

            return response.status(201).json({
                sucess: true,
                message: 'User registered successfully'
            })

        } catch (error) {
            next(error)
        }
    }
}