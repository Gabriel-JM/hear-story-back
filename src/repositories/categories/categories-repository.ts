import Knex from 'knex'
import { Repository } from '../../protocols/infra'
import { Category } from '../../protocols/models'

export class CategoriesRepository implements Repository<Category> {
  private readonly table: Knex.QueryBuilder
  
  constructor(knex: Knex<Category>) {
    this.table = knex<Category>('categories')
  }

  async findAll() {
    const allCategories = await this.table.select()

    return allCategories || []
  }

  async find(id: number) {
    const [category] = await this.table.where({ id })

    return category || null
  }

  async save(category: Category) {
    const [categoryId] = await this.table.insert(category)

    return this.find(categoryId)
  }

  async update(category: Category) {
    const ok = await this.table
      .where({ id: category.id })
      .update(category)

    return ok ? this.find(category.id as number) : null
  }

  async delete(id: number) {
    const ok = await this.table.where({ id }).delete()

    return ok ? {
      success: true,
      message: 'Categoria removida com sucesso'
    } : {
      success: false,
      message: 'Não foi possível remover a categoria'
    }
  }
}
