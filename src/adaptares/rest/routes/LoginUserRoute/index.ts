import { LoginUserUseCase } from "../../../../domain/useCases/LoginUser/LoginUserUseCase";
import { BcryptService } from "../../../externalServices/BcryptService";
import { JwtService } from "../../../externalServices/JwtService";
import { MySqlUserRepository } from "../../../repositories/MySqlUserRepository";
import { LoginUserController } from "../../controllers/LoginUserController";
import { LoginUserRoute } from "./LoginUserRoute";

const userRepository = new MySqlUserRepository()
const encryptService = new BcryptService()
const authenticationService = new JwtService()
const loginUserUseCase = new LoginUserUseCase(userRepository,encryptService,authenticationService)
const loginUserController = new LoginUserController(loginUserUseCase)
const loginUserRoute = new LoginUserRoute(loginUserController)

export { loginUserRoute }