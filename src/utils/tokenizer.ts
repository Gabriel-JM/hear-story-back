import { User } from '../protocols/models'
import { TokenGenerator, TokenVerificationResult } from '../protocols/utils'
import JWT from 'jsonwebtoken'

const maxExperitionDate = 24 * 60 * 60

export class Tokenizer implements TokenGenerator {

  constructor(private readonly secretKey: string) {}

  generate({ id, username, name }: User) {
    return JWT.sign({ id, username, name }, this.secretKey, {
      expiresIn: maxExperitionDate
    })
  }

  verify(tokenToVerify: string) {
    const verification = JWT.verify(tokenToVerify, this.secretKey)

    return verification as TokenVerificationResult
  }
}
