export class ValidationError extends Error {
    constructor() {
        super('Request body is invalid')
        this.name = 'ValidationError'
    }
}