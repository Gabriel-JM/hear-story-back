import { User } from '../models'
import { TokenVerificationResult } from './token-verification-result'

export interface TokenGenerator {
  generate(user: User): string
  verify(tokenToVerify: string): TokenVerificationResult
}
