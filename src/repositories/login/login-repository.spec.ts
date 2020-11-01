import { inMemoryDb } from '../test/inMemoryDb'
import { LoginRepository } from './login-repository'

const testDb = inMemoryDb()

function makeSut() {
  const sut = new LoginRepository('users', testDb)

  return sut
}

describe('Login Repository', () => {
  const user = {
    username: 'any_user',
    password: 'hashed_password'
  }

  beforeAll(async () => {
    return await testDb.migrate.latest()
  })

  afterAll(async () => {
    await testDb.migrate.rollback()
    return await testDb.destroy()
  })

  it('should insert a new user', async () => {
    const sut = makeSut()
  
    const insertedUser = await sut.save(user)
    const [fromDbUser] = await testDb('users').where({ id: insertedUser.id })

    expect(insertedUser).toBeDefined()
    expect(insertedUser).toEqual(fromDbUser)
  })

  it('should throw an error if has duplicated usernames', async () => {
    const sut = makeSut()

    await expect(sut.save(user)).rejects.toThrowError()
  })
})
