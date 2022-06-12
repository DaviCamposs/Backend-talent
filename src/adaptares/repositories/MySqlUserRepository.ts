import { getManager, Repository } from "typeorm";
import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/ports/out/UserRepository";
import { UserEntity } from "./entities/User";

export class MySqlUserRepository implements UserRepository {

    private repository: Repository<UserEntity>

    constructor() {
        this.repository = getManager().getRepository(UserEntity)
    }

    async save(name: string, email: string, password: string): Promise<void> {
        await this.repository.save({ email, name, password })
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email })
        return user ? new User(user.name,user.email,user.password)  : null
    }

    async findById(id: number): Promise<User> {
        const user = await this.repository.findOneBy({ id })
        return user ? new User(user.name,user.email,user.password)  : null
    }
    
}