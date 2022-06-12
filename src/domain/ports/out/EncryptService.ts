export interface EncryptService {
    hash(value: string): Promise<string>
}