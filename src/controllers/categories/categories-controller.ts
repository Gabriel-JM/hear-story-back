import { HttpRequest, Repository } from '../../protocols/infra'
import { Category, User } from '../../protocols/models'
import { ErrorParser } from '../../resources/errors/error-parser'
import { HttpResponse } from '../../resources/http/http-response'

export class CategoriesController {
  constructor(
    private readonly repository: Repository<Category>,
    private readonly userRepository: Repository<User>
  ) {}

  async index() {
    try {
      const allCategories = await this.repository.findAll!()

      return HttpResponse.ok(allCategories)
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }

  async show(request: HttpRequest) {
    try {
      const { id } = request.params

      const category = await this.repository.find!(id)

      if(!category) {
        return HttpResponse.notFound({
          field: 'id',
          error: 'Categoria não encontrada'
        })
      }

      return HttpResponse.ok(category)
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }

  async create(request: HttpRequest) {
    try {
      const { name, color, user } = request.body as Category
      const hasUser = await this.userRepository.find!(user)

      if(!hasUser) {
        return HttpResponse.badRequest({
          field: 'user',
          error: 'Usuário não existente'
        })
      }

      const category = await this.repository.save!({ name, color, user })

      return HttpResponse.ok(category)
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }

  async update(request: HttpRequest) {
    try {
      const { id } = request.params
      const { name, color, user } = request.body as Category
      const hasUser = await this.userRepository.find!(user)

      if(!hasUser) {
        return HttpResponse.badRequest({
          field: 'user',
          error: 'Usuário não existente'
        })
      }

      const hasCategory = await this.repository.find!(id)

      if(!hasCategory) {
        return HttpResponse.notFound({
          field: 'id',
          error: 'Categoria não encontrada'
        })
      }

      const category = await this.repository.update!({ name, color, user })

      return HttpResponse.ok(category)
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }

  async destroy(request: HttpRequest) {
    try {
      const { id } = request.params

      const deleted = await this.repository.delete!(id)

      return HttpResponse.ok(deleted)
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }
}
