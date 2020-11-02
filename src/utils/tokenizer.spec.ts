import { Tokenizer } from './tokenizer'

function makeSut(secretKey = 'secret') {
  const sut = new Tokenizer(secretKey)

  return sut
}

describe('Tokenizer', () => {
  it('Should return a token on generate method', () => {
    const sut = makeSut()

    const token = sut.generate({
      id: 1,
      name: 'any_name',
      email: 'any_email@mail.com',
      birthday: '2000-04-10',
      privacyTerms: true,
      username: 'any_username',
      password: 'hashed_password'
    })

    expect(token).toBeDefined()
    expect(token.length).toBeGreaterThan(1)
  })

  it('should return the user info if a valid token is provided on verify', () => {
    const sut = makeSut()
    const user = {
      id: 1,
      name: 'any_name',
      email: 'any_email@mail.com',
      birthday: '2000-04-10',
      privacyTerms: true,
      username: 'any_username',
      password: 'hashed_password'
    }

    const token = sut.generate(user)

    const isValid = sut.verify(token)

    expect(isValid).toBeInstanceOf(Object)
    expect(isValid.id).toBe(user.id)
    expect(isValid.username).toBe(user.username)
  })

  it('should return a text if an invalid token is provided on verify', () => {
    const sut = makeSut()
    const token = 'invalid_token'

    expect(() => sut.verify(token)).toThrowError('jwt malformed')
  })
})
