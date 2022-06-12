import { LoginUserDTO } from "../../ports/in/DTO/LoginUserDTO";
import { LoginUser } from "../../ports/in/LoginUser";
import { AuthenticationService } from "../../ports/out/AuthenticationService";
import { EncryptService } from "../../ports/out/EncryptService";
import { UserRepository } from "../../ports/out/UserRepository";

export class LoginUserUseCase implements LoginUser {

    constructor(private userRepository: UserRepository, private encryptService: EncryptService, private authenticationService: AuthenticationService) { }

    async login(email: string, password: string): Promise<LoginUserDTO> {
        throw new Error("Method not implemented.");
    }

}