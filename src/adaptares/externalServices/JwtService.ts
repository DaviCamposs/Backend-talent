import { AuthenticationService } from "../../domain/ports/out/AuthenticationService";
import * as jwt from "jsonwebtoken";

export class JwtService implements AuthenticationService {
    async generateToken(id: number, email: string): Promise<string> {
        const token = await jwt.sign({ id, email }, 'secret');
        return token
    }
}