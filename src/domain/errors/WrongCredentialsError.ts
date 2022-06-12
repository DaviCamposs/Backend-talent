export class WrongCredentialsError extends Error {
    constructor() {
        super('Wrong Credentials')
        this.name = 'WrongCredentialsError'
    }

}