import { LoginRepository } from '../../protocols/infra/login-repository'
import { User } from '../../protocols/models'
import { SqliteError, TokenGenerator } from '../../protocols/utils'
import { LoginController } from './login-controller'

function makeSut() {
  const repositorySpy = <LoginRepository> {
    findByUsername(_username: string) {},
    save(_content: any) {}
  }

  const loginValidator = {
    isEmail(email: string) {
      return Boolean(email)
    },
    isDate(date: string) {
      return Boolean(date)
    }
  }

  const passwordHasherSpy = {
    hash(_str: string) {
      return Promise.resolve('hashed_password')
    },
    compare(_str1: string, _str2: string) {
      return Promise.resolve(true)
    }
  }

  const tokenGeneratorSpy: TokenGenerator = {
    generate(_str: User) {
      return 'any_token'
    },
    verify(_str1: string) {
      return {
        id: 1,
        username: 'any_username',
        iat: 0,
        exp: 0
      }
    }
  }
  
  const sut = new LoginController(
    repositorySpy,
    loginValidator,
    passwordHasherSpy,
    tokenGeneratorSpy
  )

  return {
    sut,
    repositorySpy,
    loginValidator,
    passwordHasherSpy,
    tokenGeneratorSpy
  }
}

describe('Login Controller', () => {
  const httpRequest = {
    params: {},
    query: {},
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      birthday: '2000-04-10',
      privacyTerms: true,
      username: 'any_username',
      password: 'any_password'
    }
  }

  it('should return a 404 response, when no user is found in login', async () => {
    const { sut, repositorySpy } = makeSut()

    jest.spyOn(repositorySpy, 'findByUsername')
      .mockImplementationOnce(
        () => Promise.resolve(null)
      )
    ;

    const response = await sut.index({ params: {}, body: {}, query: {} })

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      field: 'name',
      error: 'Usuário não encontrado.'
    })
  })

  it('should return a 400 response, if an ivalid password is provided', async () => {
    const { sut, repositorySpy, passwordHasherSpy } = makeSut()

    const httpRequest = {
      params: {},
      query: {},
      body: {
        username: 'any_username',
        password: 'any_password'
      }
    }

    jest.spyOn(repositorySpy, 'findByUsername')
      .mockReturnValueOnce(
        Promise.resolve({ password: '' } as User)
      )
    ;

    const hasherCompare = jest.spyOn(passwordHasherSpy, 'compare')
      .mockReturnValueOnce(Promise.resolve(false))
    ;

    const response = await sut.index(httpRequest)

    expect(hasherCompare).toHaveBeenCalledWith('any_password', '')
    expect(response.body).toEqual({
      field: 'password',
      error: 'Senha inválida.'
    })
    expect(response.status).toBe(400)
  })

  it('should return a 200 response, with user access details', async () => {
    const { sut, repositorySpy } = makeSut()

    const httpRequest = {
      params: {},
      query: {},
      body: {
        username: 'any_username',
        password: 'any_password'
      }
    }

    jest.spyOn(repositorySpy, 'findByUsername')
      .mockReturnValueOnce(
        Promise.resolve({
          id: 1,
          name: 'any_name',
          email: 'any_email@mail.com',
          birthday: '2000-04-10',
          privacyTerms: true,
          username: 'any_username',
          password: 'any_password'
        })
      )
    ;

    const response = await sut.index(httpRequest)

    expect(response.body).toEqual({
      id: 1,
      name: 'any_name',
      username: 'any_username',
      token: 'any_token'
    })
    expect(response.status).toBe(200)
  })

  it('should return the user id, username and token when new user is registered', async () => {
    let { sut, repositorySpy } = makeSut()

    const repositorySaveSpy = jest
      .spyOn(repositorySpy, 'save')
      .mockImplementationOnce(() => Promise.resolve(
        {
          id: 1,
          name: 'any_name',
          email: 'any_email@mail.com',
          birthday: '2000-04-10',
          privacyTerms: true,
          username: 'any_username',
          password: 'hashed_password'
        }
      )
    )
    
    const response = await sut.create(httpRequest)
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 1,
      username: 'any_username',
      name: 'any_name',
      token: 'any_token'
    })

    expect(repositorySaveSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      birthday: '2000-04-10',
      privacyTerms: true,
      username: 'any_username',
      password: 'hashed_password'
    })
  })

  it('should return a 500 response if repository throws some error', async () => {
    const { sut, repositorySpy } = makeSut()

    jest.spyOn(repositorySpy, 'save')
      .mockImplementationOnce(() => { throw Error('Repository Error') })

    const response = await sut.create(httpRequest)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      field: '',
      error: 'Repository Error'
    })
  })

  it('should return a 406 response for unique constraint database error', async () => {
    const { sut, repositorySpy } = makeSut()

    jest.spyOn(repositorySpy, 'save')
      .mockImplementationOnce(() => {
        const error = new Error('SQLITE_CONSTRAINT UNIQUE error') as SqliteError
        error.code = 'SQLITE_CONSTRAINT'
        throw error
      })

    const response = await sut.create(httpRequest)

    expect(response.status).toBe(406)
    expect(response.body).toEqual({
      field: '',
      error: 'SQLITE_CONSTRAINT UNIQUE error'
    })
  })

  it('should return a 406 response if an invalid email is provided', async () => {
    const { sut, loginValidator } = makeSut()

    jest.spyOn(loginValidator, 'isEmail')
      .mockImplementationOnce(() => false)

    const response = await sut.create(httpRequest)

    expect(response.status).toBe(406)
    expect(response.body).toEqual({
      field: 'email',
      error: 'E-mail inválido.'
    })
  })

  it('should return a 406 response if an invalid birthday is provided', async () => {
    const { sut, loginValidator } = makeSut()

    jest.spyOn(loginValidator, 'isDate')
      .mockImplementationOnce(() => false)

    const response = await sut.create(httpRequest)

    expect(response.status).toBe(406)
    expect(response.body).toEqual({
      field: 'birthday',
      error: 'Data de nascimento inválida.'
    })
  })

  it('should return a 406 response if an invalid birthday is provided', async () => {
    const { sut } = makeSut()

    httpRequest.body.privacyTerms = false

    const response = await sut.create(httpRequest)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      field: 'privacyTerms',
      error: 'Termo de privacidade é obrigatório.'
    })
  })
})
