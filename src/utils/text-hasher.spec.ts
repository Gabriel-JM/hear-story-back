import { TextHasher } from './text-hasher'
jest.mock('bcrypt', () => {
  return {
    genSalt() {
      return 10
    },

    hash(text: string) {
      return 'hashed_' + text
    },

    compare(toCompare: string, toBeCompared: string) {
      return toCompare === toBeCompared
    }
  }
})

const makeSut = () => new TextHasher()

describe('Text Hasher', () => {
  const sut = makeSut()

  it('should return a encrypted text', async () => {
    const hashedText = await sut.hash('any_text')

    expect(hashedText).toBe('hashed_any_text')
  })

  it('should return true if compare is successful', async () => {
    const isValid = await sut.compare('hashed', 'hashed')

    expect(isValid).toBe(true)
  })

  it('should return false if compare was not successful', async () => {
    const isValid = await sut.compare('normal', 'hashed')

    expect(isValid).toBe(false)
  })
})
