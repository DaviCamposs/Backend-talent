import { NameTooShortError } from "../errors/NameTooShortError"

export class User {
    public id?: number
    public name: string
    public email: string
    public password: string

    constructor (name: string, email: string , password: string) {
        if (name.length < 2)
            throw new NameTooShortError()
        this.name = name
        this.email = email
        this.password = password
    }
}