import { RegisterUser } from "../../ports/in/RegisterUser";

export class RegisterUserUseCase implements RegisterUser {
    async register(name: string, email: string, password: string): Promise<void> { }
}