import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class EncryptionService {
  async encrypt(plainMessage: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const encrypted = await bcrypt.hash(plainMessage, salt)

    return encrypted
  }

  async verify(plain: string, encrypted: string): Promise<boolean> {
    const verified = await bcrypt.compare(plain, encrypted)

    return verified
  }
}
