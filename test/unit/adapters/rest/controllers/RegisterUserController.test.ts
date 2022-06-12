import { NextFunction, request, Request, response, Response } from "express"
import { ValidationError } from "../../../../../src/adaptares/rest/controllers/errors/ValidationError"
import { RegisterUserController } from "../../../../../src/adaptares/rest/controllers/RegisterUserController"
import { RegisterUser } from "../../../../../src/domain/ports/in/RegisterUser"

describe('RegisterUserController Tests', () => {
    it('should throw an validationError if the body is invalid', async () => {
        const req: Request = expect.any(request)
        req.body = { name: 'David' }
        const res: Response = expect.any(response)
        const next: NextFunction = jest.fn()

        const registerUserUseCase: RegisterUser = {
            register: jest.fn()
        }

        const sut = new RegisterUserController(registerUserUseCase)
        await sut.execute(req, res, next)

        expect(next).toBeCalledTimes(1)
        expect(next).toBeCalledWith(new ValidationError())
    })

    it('should save a valid user', async () => {
        const req: Request = expect.any(request)
        req.body = { name: 'David' , email: 'david@mail.com' , password: '12345678' }
        const res: Response = expect.any(response)
        res.status = jest.fn().mockReturnThis()
        res.json = jest.fn()
        const next: NextFunction = jest.fn()

        const registerUserUseCase: RegisterUser = {
            register: jest.fn()
        }

        const sut = new RegisterUserController(registerUserUseCase)
        await sut.execute(req, res, next)

        expect(registerUserUseCase.register).toBeCalledTimes(1)
        expect(registerUserUseCase.register).toBeCalledWith('David','david@mail.com','12345678')
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({sucess: true,message: 'User registered successfully'})
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(201)
    })
})