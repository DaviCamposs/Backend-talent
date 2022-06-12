import { InvalidEmailError } from "../../../../src/domain/errors/InvalidEmailError"
import { NameTooShortError } from "../../../../src/domain/errors/NameTooShortError"
import { PasswordTooShortError } from "../../../../src/domain/errors/PasswordTooShortError"
import { User } from "../../../../src/domain/models/User"

const VALID_NAME = 'David'
const INVALID_NAME = 'D'
const VALID_PASSWORD = '12345678'
const INVALID_PASSWORD = '12345'
const VALID_EMAIL = 'david@mail.com'
const INVALID_EMAIL = 'david@'

describe('User Tests', () => {
    it('should create an instance of User class', () => {
        expect(new User(VALID_NAME,VALID_EMAIL, VALID_PASSWORD)).toBeInstanceOf(User)
    })
    it('should throw an Error if the name has less than 2 chars', () => {
        expect(() => new User(INVALID_NAME,VALID_EMAIL, VALID_PASSWORD)).toThrow(NameTooShortError)
    })

    it('should throw an error if password has less than 8 chars', () => {
        expect(() => new User(VALID_NAME,VALID_EMAIL,INVALID_PASSWORD)).toThrow(PasswordTooShortError)
    })

    it('should throw an Error if email is invalid', () => {
        expect(() => new User(VALID_NAME,INVALID_EMAIL,VALID_PASSWORD)).toThrow(InvalidEmailError)
    })
})