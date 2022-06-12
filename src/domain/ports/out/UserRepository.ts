import { User } from "../../models/User"

export interface UserRepository {
    save(name: string, email: string, password: string): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: number): Promise<User>
}