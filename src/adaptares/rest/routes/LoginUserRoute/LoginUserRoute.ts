import { Application } from "express";
import { LoginUserController } from "../../controllers/LoginUserController";
import { Route } from "../Route";

export class LoginUserRoute implements Route {
    constructor(private loginUserRoute: LoginUserController) { }
    
    mountRoute(application: Application): void {
        application.route('/api/v1/auth/login')
            .post(this.loginUserRoute.execute)
    }

}