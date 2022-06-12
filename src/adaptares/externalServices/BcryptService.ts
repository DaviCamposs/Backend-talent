import { EncryptService } from "../../domain/ports/out/EncryptService";
import bcryptjs from 'bcryptjs';

export class BcryptService implements EncryptService {
    async hash(value: string): Promise<string> {
        return await bcryptjs.hash(value, 12)
    }

    async compare(value: string, hashedValue: string): Promise<boolean> {
        return await bcryptjs.compare(value,hashedValue)
    }
}