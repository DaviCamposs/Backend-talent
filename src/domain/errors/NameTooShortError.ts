export class NameTooShortError extends Error {
    constructor() {
        super('Name too short')
        this.name = 'NameTooShortError'
    }
}