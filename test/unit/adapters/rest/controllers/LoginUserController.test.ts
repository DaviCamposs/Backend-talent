import { NextFunction, request, Request, response, Response } from "express";
import { ValidationError } from "../../../../../src/adaptares/rest/controllers/errors/ValidationError";
import { LoginUserController } from "../../../../../src/adaptares/rest/controllers/LoginUserController";
import { LoginUser } from "../../../../../src/domain/ports/in/LoginUser";

describe('LoginUserController Tests', () => {
    it('should throw a validation error if the body is invalid', async () => {
        const req: Request = expect.any(request);
        req.body = { email: 'david@mail.com' }
        const res: Response = expect.any(response);
        const next: NextFunction = jest.fn();

        const loginUserUseCase: LoginUser = {
            login: jest.fn()
        }
        const sut = new LoginUserController(loginUserUseCase)

        await sut.execute(req, res, next)

        expect(next).toBeCalledTimes(1)
        expect(next).toBeCalledWith(new ValidationError())
    })

    it('should return a token if everything is ok', async () => {
        const req: Request = expect.any(request);
        req.body = { email: 'david@mail.com', password: '12345678' };
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        const next: NextFunction = jest.fn();

        const loginUserUseCase: LoginUser = {
            login: jest.fn().mockResolvedValue({ token: 'validtoken' })
        }

        const sut = new LoginUserController(loginUserUseCase);
        await sut.execute(req, res, next)

        expect(next).toBeCalledTimes(0);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({
            success: true,
            message: 'login successfully',
            jwt: 'validtoken'
        });
    })
})