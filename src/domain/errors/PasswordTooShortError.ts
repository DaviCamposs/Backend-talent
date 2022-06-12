export class PasswordTooShortError extends Error {
    constructor() {
        super('Password too short')
        this.name = 'PasswordTooShortError'
    }
}