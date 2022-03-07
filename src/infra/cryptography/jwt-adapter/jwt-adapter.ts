import jwt from 'jsonwebtoken'

import { Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    jwt.sign({ id: value }, this.secret)

    return null
  }
}
