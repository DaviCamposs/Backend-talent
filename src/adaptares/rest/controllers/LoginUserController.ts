import { NextFunction, Request, Response } from "express";
import { LoginUser } from "../../../domain/ports/in/LoginUser";
import { ValidationError } from "./errors/ValidationError";

export class LoginUserController {
    constructor(private loginUserUseCase: LoginUser) { }

    execute = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const email = request.body?.email
            const password = request.body?.password

            if (!email || !password)
                throw new ValidationError()

            const { token } = await this.loginUserUseCase.login(email, password)

            return response.status(200).json({
                success: true,
                message: 'login successfully',
                jwt: token
            })

        } catch (error) {
            next(error)
        }
    }
}