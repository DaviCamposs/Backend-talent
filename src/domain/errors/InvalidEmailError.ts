export class InvalidEmailError extends Error {
    constructor() {
        super('Email is invalid')
        this.name = 'InvalidEmailError'
    }
}