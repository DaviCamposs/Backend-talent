import { NameTooShortError } from "../../../../src/domain/errors/NameTooShortError"
import { User } from "../../../../src/domain/models/User"

describe('User Tests', () => {
    it('should create an instance of User class', () => {
        expect(new User('david','david@mail.com', '12345678')).toBeInstanceOf(User)
    })
    it('should throw an Error if the name has less than 2 chars', () => {
        expect(() => new User('D','david@mail.com','12345678')).toThrow(NameTooShortError)
    })
})