export interface AuthenticationService {
    generateToken(id: number, email: string): Promise<string>
}