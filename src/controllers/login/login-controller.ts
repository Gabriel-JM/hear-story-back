import { HttpRequest } from '../../protocols/infra'
import { LoginRepository } from '../../protocols/infra/login-repository'
import { User } from '../../protocols/models'
import { ContentValidator, Hasher } from '../../protocols/utils'
import { TokenGenerator } from '../../protocols/utils/token-generator'
import { ErrorParser } from '../../resources/errors/error-parser'
import { HttpResponse } from '../../resources/http/http-response'

export class LoginController {

  constructor(
    private readonly repository: LoginRepository,
    private readonly validator: ContentValidator,
    private readonly passwordHasher: Hasher,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async index(request: HttpRequest) {
    try {
      const { username, password } = request.body as User
      const user = await this.repository.findByUsername(username)

      if(!user) {
        return HttpResponse.notFound({
          field: 'name',
          error: 'Usuário não encontrado.'
        })
      }

      const isPasswordValid = await this.passwordHasher.compare(
        password,
        user.password
      )

      if(!isPasswordValid) {
        return HttpResponse.badRequest({
          field: 'password',
          error: 'Senha inválida.'
        })
      }

      const token = this.tokenGenerator.generate(user)

      return HttpResponse.ok({
        id: user.id,
        username: user.username,
        name: user.name,
        token
      })
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }

  async create(request: HttpRequest) {
    try {
      const { email, name, birthday, privacyTerms, username, password } = request.body as User
      const hashedPassword = await this.passwordHasher.hash(password)

      if(!this.validator.isEmail(email)) {
        return HttpResponse.notAcceptable({
          field: 'email',
          error: 'E-mail inválido.'
        })
      }

      if(!this.validator.isDate(birthday)) {
        return HttpResponse.notAcceptable({
          field: 'birthday',
          error: 'Data de nascimento inválida.'
        })
      }

      if(!privacyTerms) {
        return HttpResponse.badRequest({
          field: 'privacyTerms',
          error: 'Termo de privacidade é obrigatório.'
        })
      }

      const userCredentials = {
        name,
        email,
        birthday,
        privacyTerms,
        username,
        password: hashedPassword
      }

      const user = await this.repository.save!(userCredentials)

      const token = this.tokenGenerator.generate(user)

      return HttpResponse.ok({
        id: user.id,
        username: user.username,
        name: user.name,
        token
      })
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }
}
