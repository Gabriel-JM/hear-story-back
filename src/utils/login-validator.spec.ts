import { LoginValidator } from './login-validator'

const makeSut = () => new LoginValidator()

describe('Login Validator', () => {
  it('should return true if passed a valid date', () => {
    const sut = makeSut()
    const validDates = [
      '1920-01-01',
      '1999-05-05',
      '2012-02-29',
      '2000-01-02'
    ]

    for(const date of validDates) {
      expect(sut.isDate(date)).toBe(true)
    }
  })
})
