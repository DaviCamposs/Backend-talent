import { Application } from "express";
import { RegisterUserController } from "../../controllers/RegisterUserController";
import { Route } from "../Route";

export class RegisterUserRoute implements Route {
    constructor(private registerUserController: RegisterUserController) { }
    
    mountRoute(application: Application): void {
        application.route('/api/v1/auth/register')
            .post(this.registerUserController.execute)
    }

}