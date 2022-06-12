import { NameTooShortError } from "../errors/NameTooShortError"
import { PasswordTooShortError } from "../errors/PasswordTooShortError"

export class User {
    public id?: number
    public name: string
    public email: string
    public password: string

    constructor (name: string, email: string , password: string) {
        if (name.length < 2)
            throw new NameTooShortError()

        if (password.length < 8)
            throw new PasswordTooShortError()
        this.name = name
        this.email = email
        this.password = password
    }
}