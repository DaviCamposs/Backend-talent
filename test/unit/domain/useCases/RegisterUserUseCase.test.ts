import { EmailAlreadyRegisteredError } from "../../../../src/domain/errors/EmailAlreadyRegisteredError"
import { EncryptService } from "../../../../src/domain/ports/out/EncryptService"
import { UserRepository } from "../../../../src/domain/ports/out/UserRepository"
import { RegisterUserUseCase } from "../../../../src/domain/useCases/RegisterUser/RegisterUserUseCase"

describe('RegisterUserUseCase Tests',() => {
    it('should throw an error if email is already registered', async () => {

        const userRepository : UserRepository = {
            save: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue({ id: 2, name: 'David', email: 'david@mail.com', password: '12345678' }),
            findById: jest.fn()
        }

        const encryptService: EncryptService = {
            hash: jest.fn().mockResolvedValue('hashedPassword'),
            compare: jest.fn()
        }

        const sut = new RegisterUserUseCase(userRepository,encryptService)

        expect(() => sut.register('David','david@mail.com','12345678')).rejects.toThrow(EmailAlreadyRegisteredError)
        expect(userRepository.findByEmail).toBeCalledTimes(1)
        expect(userRepository.findByEmail).toBeCalledWith('david@mail.com')
    })

    it('should hash a password before save a user', async () => {
        const userRepository : UserRepository = {
            save: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn()
        }

        const encryptService: EncryptService = {
            hash: jest.fn().mockResolvedValue('hashedPassword'),
            compare: jest.fn()
        }

        const sut = new RegisterUserUseCase(userRepository,encryptService)

        await sut.register('David','david@mail.com','12345678')
        
        expect(encryptService.hash).toBeCalledTimes(1)
        expect(encryptService.hash).toBeCalledWith('12345678')
    })

    it('should save a user with a hashed password', async () => {
        const userRepository : UserRepository = {
            save: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn()
        }

        const encryptService: EncryptService = {
            hash: jest.fn().mockResolvedValue('hashedPassword'),
            compare: jest.fn()
        }

        const sut = new RegisterUserUseCase(userRepository,encryptService)

        await sut.register('David','david@mail.com','12345678')
        
        expect(userRepository.save).toBeCalledTimes(1)
        expect(userRepository.save).toBeCalledWith('David','david@mail.com','hashedPassword')
    })
})