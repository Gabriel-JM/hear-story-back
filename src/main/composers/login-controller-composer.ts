import { LoginController } from '../../controllers/login/login-controller'
import { EnvironmentOptions } from '../../protocols/infra'
import { LoginRepository } from '../../repositories/login/login-repository'
import { connectionDatabase } from '../../resources/database/connection'
import { TextHasher } from '../../utils/text-hasher'
import { Tokenizer } from '../../utils/tokenizer'

export default () => {
  const passwordHasher = new TextHasher()
  const tokenGenerator = new Tokenizer(process.env.SECRET_KEY as string)

  const knexDB = connectionDatabase(process.env.NODE_ENV as EnvironmentOptions)
  const loginRepository = new LoginRepository('users', knexDB)

  const loginController = new LoginController(
    loginRepository,
    passwordHasher,
    tokenGenerator
  )

  return loginController
}
