import { RegisterUserUseCase } from "../../../../domain/useCases/RegisterUser/RegisterUserUseCase";
import { BcryptService } from "../../../externalServices/BcryptService";
import { JwtService } from "../../../externalServices/JwtService";
import { MySqlUserRepository } from "../../../repositories/MySqlUserRepository";
import { RegisterUserController } from "../../controllers/RegisterUserController";
import { RegisterUserRoute } from "./RegisterUserRoute";

const userRepository = new MySqlUserRepository()
const encryptService = new BcryptService()
const registerUserUseCase = new RegisterUserUseCase(userRepository,encryptService)
const registerUserController = new RegisterUserController(registerUserUseCase)
const registerUserRoute = new RegisterUserRoute(registerUserController)

export  { registerUserRoute  }