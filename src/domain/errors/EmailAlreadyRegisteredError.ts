export class EmailAlreadyRegisteredError extends Error {
    constructor() {
        super('Emai is already registered')
        this.name = 'EmailAlreadyRegistered'
    }
}