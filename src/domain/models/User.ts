import { InvalidEmailError } from "../errors/InvalidEmailError"
import { NameTooShortError } from "../errors/NameTooShortError"
import { PasswordTooShortError } from "../errors/PasswordTooShortError"

const MINIMUM_CHAR_REQUIRED_NAME = 2
const MINIMUM_CHAR_REQUIRED_PASSWORD = 8

export class User {
    public id?: number
    public name: string
    public email: string
    public password: string

    constructor(name: string, email: string, password: string) {
        if (name.length < MINIMUM_CHAR_REQUIRED_NAME)
            throw new NameTooShortError()

        if (password.length < MINIMUM_CHAR_REQUIRED_PASSWORD)
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