import { Hasher } from '../protocols/utils'
import bcrypt from 'bcrypt'

export class TextHasher implements Hasher {
  async hash(text: string) {
    const salts = await bcrypt.genSalt()
    const hashedText = await bcrypt.hash(text, salts)

    return hashedText
  }

  async compare(toCompare: string, toBeCompared: string) {
    const isValid = await bcrypt.compare(toCompare, toBeCompared)

    return isValid
  }
}
