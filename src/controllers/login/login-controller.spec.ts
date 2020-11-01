import { Repository } from '../../protocols/infra'
import { User } from '../../protocols/models'
import { SqliteError } from '../../protocols/utils'
import { LoginController } from './login-controller'

function makeSut() {
  const repositorySpy = { save(_content: any) {} } as Repository<User>
  const passwordHasherSpy: any = { hash() {} }
  const tokenGeneratorSpy: any = { generate() {} }
  const sut = new LoginController(repositorySpy, passwordHasherSpy, tokenGeneratorSpy)

  return {
    sut,
    repositorySpy,
    passwordHasherSpy,
    tokenGeneratorSpy
  }
}

describe('Login Controller', () => {
  const httpRequest = {
    params: {},
    query: {},
    body: {
      username: 'any_username',
      password: 'any_password'
    }
  }

  it('should return the user id, username and token when new user is registered', async () => {
    let { sut, repositorySpy, passwordHasherSpy, tokenGeneratorSpy } = makeSut()

    passwordHasherSpy.hash = jest.fn((_str) => 'hashed_password')
    tokenGeneratorSpy.generate = jest.fn((_user) => 'any_token')

    const repositorySaveSpy = jest
      .spyOn(repositorySpy, 'save')
      .mockImplementationOnce(() => Promise.resolve(
        {
          id: 1,
          username: 'any_username',
          password: 'any_password'
        }
      )
    )

    const response = await sut.create(httpRequest)
    
    expect(passwordHasherSpy.hash).toHaveBeenCalledTimes(1)
    expect(passwordHasherSpy.hash).toHaveBeenCalledWith('any_password')

    expect(tokenGeneratorSpy.generate).toHaveBeenCalledTimes(1)
    expect(tokenGeneratorSpy.generate).toHaveBeenCalledWith({
      id: 1,
      username: 'any_username',
      password: 'any_password'
    })

    expect(repositorySaveSpy).toHaveBeenCalledWith({
      username: 'any_username',
      password: 'hashed_password'
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 1,
      username: 'any_username',
      token: 'any_token'
    })
  })

  it('should return a 500 response if repository throws some error', async () => {
    const { sut, repositorySpy, passwordHasherSpy, tokenGeneratorSpy } = makeSut()

    passwordHasherSpy.hash = jest.fn((_str) => 'hashed_password')
    tokenGeneratorSpy.generate = jest.fn((_user) => 'any_token')

    jest.spyOn(repositorySpy, 'save')
      .mockImplementationOnce(() => { throw Error('Repository Error') })

    const response = await sut.create(httpRequest)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      error: 'Repository Error'
    })
  })

  it('should return a 406 response for unique constraint database error', async () => {
    const { sut, repositorySpy, passwordHasherSpy, tokenGeneratorSpy } = makeSut()

    passwordHasherSpy.hash = jest.fn((_str) => 'hashed_password')
    tokenGeneratorSpy.generate = jest.fn((_user) => 'any_token')

    jest.spyOn(repositorySpy, 'save')
      .mockImplementationOnce(() => {
        const error = new Error('SQLITE_CONSTRAINT UNIQUE error') as SqliteError
        error.code = 'SQLITE_CONSTRAINT'
        throw error
      })

    const response = await sut.create(httpRequest)

    expect(response.status).toBe(406)
    expect(response.body).toEqual({
      error: 'SQLITE_CONSTRAINT UNIQUE error'
    })
  })
})
