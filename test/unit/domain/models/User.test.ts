import { User } from "../../../../src/domain/models/User"

describe('User Tests', () => {
    it('should create an instance of User class', () => {
        expect(new User('david','david@mail.com', '12345678')).toBeInstanceOf(User)
    })
})