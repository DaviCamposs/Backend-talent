import { WrongCredentialsError } from "../../../../src/domain/errors/WrongCredentialsError"
import { AuthenticationService } from "../../../../src/domain/ports/out/AuthenticationService"
import { EncryptService } from "../../../../src/domain/ports/out/EncryptService"
import { UserRepository } from "../../../../src/domain/ports/out/UserRepository"
import { LoginUserUseCase } from "../../../../src/domain/useCases/LoginUser/LoginUserUseCase"

describe('LoginUserUseCase Tests', () => {
    it('should throw an error if there is not a user with email', () => {

        const userRepository: UserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn(),
            save: jest.fn()
        }

        const encryptService: EncryptService = {
            hash: jest.fn(),
            compare: jest.fn()
        }

        const authenticationService: AuthenticationService = {
            generateToken: jest.fn()
        }

        const sut = new LoginUserUseCase(userRepository, encryptService, authenticationService)

        expect(() => sut.login('david@mail.com', '12345678')).rejects.toThrow(WrongCredentialsError)
        expect(userRepository.findByEmail).toBeCalledTimes(1)
        expect(userRepository.findByEmail).toBeCalledWith('david@mail.com')
    })

    it('should throw an error if there is not a user with password equals to input', async () => {

        const userRepository: UserRepository = {
            findByEmail: jest.fn().mockResolvedValue({ id: 123, name: 'David', email: 'david@mail.com', password: 'hashedPassword' }),
            findById: jest.fn(),
            save: jest.fn()
        }

        const encryptService: EncryptService = {
            hash: jest.fn(),
            compare: jest.fn().mockResolvedValue(false)
        }

        const authenticationService: AuthenticationService = {
            generateToken: jest.fn()
        }

        const sut = new LoginUserUseCase(userRepository, encryptService, authenticationService)

        expect(() => sut.login('david@mail.com', '12345678')).rejects.toThrow(WrongCredentialsError)
    })

    it('should generate a token with id and email valid', async () => {

        const userRepository: UserRepository = {
            findByEmail: jest.fn().mockResolvedValue({ id: 123, name: 'David', email: 'david@mail.com', password: 'hashedPassword' }),
            findById: jest.fn(),
            save: jest.fn()
        }

        const encryptService: EncryptService = {
            hash: jest.fn(),
            compare: jest.fn().mockResolvedValue(true)
        }

        const authenticationService: AuthenticationService = {
            generateToken: jest.fn().mockResolvedValue('validtoken')
        }

        const sut = new LoginUserUseCase(userRepository, encryptService, authenticationService)

        const response = await sut.login('david@mail.com', '12345678')
        expect(authenticationService.generateToken).toBeCalledTimes(1)
        expect(authenticationService.generateToken).toBeCalledWith(123, 'david@mail.com')
        expect(response).toEqual({ token: 'validtoken' })
    })
})