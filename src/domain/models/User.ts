import { InvalidEmailError } from "../errors/InvalidEmailError"
import { NameTooShortError } from "../errors/NameTooShortError"
import { PasswordTooShortError } from "../errors/PasswordTooShortError"

export class User {
    public id?: number
    public name: string
    public email: string
    public password: string

    constructor(name: string, email: string, password: string) {
        if (name.length < 2)
            throw new NameTooShortError()

        if (password.length < 8)
            throw new PasswordTooShortError()

        if (!this.validateEmail(email))
            throw new InvalidEmailError()

        this.name = name
        this.email = email
        this.password = password
    }

    private validateEmail(value: string): boolean {
        let regexValidEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
        return regexValidEmail.test(value)
    }
}