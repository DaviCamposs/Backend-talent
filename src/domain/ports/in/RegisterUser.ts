export interface RegisterUser {
    register(name: string, email: string, password: string): Promise<void>
}