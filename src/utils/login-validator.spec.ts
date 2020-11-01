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

  it('should return false if passed an invalid date', () => {
    const sut = makeSut()
    const invalidDates = [
      '1920-01-00',
      '1999-00-05',
      '2012-02-30',
      '2020-01-02'
    ]

    for(const date of invalidDates) {
      expect(sut.isDate(date)).toBe(false)
    }
  })

  it('should return true if passed a valid email', () => {
    const sut = makeSut()
    const validEmails = [
      'p.a1@email.com',
      'person@google.com',
      'ttt@mail.com'
    ]

    for(const email of validEmails) {
      expect(sut.isEmail(email)).toBe(true)
    }
  })

  it('should return false if passed an invalid email', () => {
    const sut = makeSut()
    const invalidEmails = [
      'p.a1_email.com',
      'persongoogle.com',
      'ttt@mail',
      '@email.com'
    ]

    for(const email of invalidEmails) {
      expect(sut.isEmail(email)).toBe(false)
    }
  })
})
