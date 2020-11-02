import { LoginController } from '../../controllers/login/login-controller'
import { EnvironmentOptions } from '../../protocols/infra'
import { LoginRepository } from '../../repositories/login/login-repository'
import { connectionDatabase } from '../../resources/database/connection'
import { LoginValidator } from '../../utils/login-validator'
import { TextHasher } from '../../utils/text-hasher'
import { Tokenizer } from '../../utils/tokenizer'

export default () => {
  const env = process.env.NODE_ENV as EnvironmentOptions
  const secretKey = process.env.SECRET_KEY as string

  const passwordHasher = new TextHasher()
  const tokenGenerator = new Tokenizer(secretKey)

  const knexDB = connectionDatabase(env)
  const loginRepository = new LoginRepository('users', knexDB)
  const loginValidator = new LoginValidator()

  const loginController = new LoginController(
    loginRepository,
    loginValidator,
    passwordHasher,
    tokenGenerator
  )

  return loginController
}
