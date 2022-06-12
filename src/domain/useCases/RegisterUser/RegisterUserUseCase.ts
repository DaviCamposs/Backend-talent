import { EmailAlreadyRegisteredError } from "../../errors/EmailAlreadyRegisteredError";
import { RegisterUser } from "../../ports/in/RegisterUser";
import { EncryptService } from "../../ports/out/EncryptService";
import { UserRepository } from "../../ports/out/UserRepository";

export class RegisterUserUseCase implements RegisterUser {
    constructor(private userRepository: UserRepository, private encryptService: EncryptService) { }

    async register(name: string, email: string, password: string): Promise<void> {
        const registeredUser = await this.userRepository.findByEmail(email)

        if (registeredUser)
            throw new EmailAlreadyRegisteredError()

        const hashedPassword = await this.encryptService.hash(password)

        await this.userRepository.save(name, email, hashedPassword)
    }
}