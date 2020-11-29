import { CategoriesController } from '../../controllers/categories/categories-controller'
import { EnvironmentOptions } from '../../protocols/infra'
import { CategoriesRepository } from '../../repositories/categories/categories-repository'
import { connectionDatabase } from '../../resources/database/connection'

export default () => {
  const env = process.env.NODE_ENV as EnvironmentOptions
  const knexDB = connectionDatabase(env)

  const categoriesRepository = new CategoriesRepository(knexDB)
  const categoriesController = new CategoriesController(
    categoriesRepository
  )

  return categoriesController
}
