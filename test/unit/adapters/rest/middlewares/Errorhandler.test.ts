import { NextFunction, request, Request, response, Response } from "express";
import { ValidationError } from "../../../../../src/adaptares/rest/controllers/errors/ValidationError";
import { errorHandler } from "../../../../../src/adaptares/rest/middlewares/ErrorHandler";
import { WrongCredentialsError } from "../../../../../src/domain/errors/WrongCredentialsError";

describe('ErrorHandler Tests', () => {
    it('should send a uncontrolled error', () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        const next: NextFunction = jest.fn();

        const error = new Error("random error");
        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({
            title: "InternalServerError",
            message: "Something went wrong"
        });
    })

    it("should send a validation error", () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        const next: NextFunction = jest.fn();

        const error = new ValidationError();
        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({
            title: 'Validation error',
            message: 'Request body is invalid'
        });
    });

    it("should send a WrongCredentials error", () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        const next: NextFunction = jest.fn();

        const error = new WrongCredentialsError();
        errorHandler(error, req, res, next);

        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(403);
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({
            title: 'Not authorized',
            message: 'Verify your credentials'
        });
    });
})