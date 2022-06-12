import { NameTooShortError } from "../../../../src/domain/errors/NameTooShortError"
import { PasswordTooShortError } from "../../../../src/domain/errors/PasswordTooShortError"
import { User } from "../../../../src/domain/models/User"

describe('User Tests', () => {
    it('should create an instance of User class', () => {
        expect(new User('david','david@mail.com', '12345678')).toBeInstanceOf(User)
    })
    it('should throw an Error if the name has less than 2 chars', () => {
        expect(() => new User('D','david@mail.com','12345678')).toThrow(NameTooShortError)
    })

    it('should throw an error if password has less than 8 chars', () => {
        expect(() => new User('David','david@mail.com','123456')).toThrow(PasswordTooShortError)
    })
})