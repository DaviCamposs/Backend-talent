export interface EncryptService {
    hash(value: string): Promise<string>
    compare(value: string, hashedValue: String): Promise<boolean>
}