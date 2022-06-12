import { LoginUserDTO } from "./DTO/LoginUserDTO";

export interface LoginUser {
    login(email: string,password: string): Promise<LoginUserDTO>
}