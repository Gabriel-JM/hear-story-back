import Knex from 'knex'
import { Repository } from '../../protocols/infra'
import { Category } from '../../protocols/models'

export class CategoriesRepository implements Repository<Category> {
  private readonly table = 'categories'
  
  constructor(private readonly knex: Knex<Category>) {}

  async findAll() {
    const allCategories = await this.knex<Category>(this.table).select()

    return allCategories || []
  }

  async find(id: number) {
    const [category] = await this.knex<Category>(this.table)
      .where({ id })

    return category || null
  }

  async save(category: Category) {
    const [categoryId] = await this.knex<Category>(this.table)
      .insert(category)

    return this.find(categoryId)
  }

  async update(category: Category) {
    await this.knex<Category>(this.table)
      .where({ id: category.id })
      .update(category)

    return this.find(category.id as number)
  }

  async delete(id: number) {
    const ok = await this.knex<Category>(this.table)
      .where({ id })
      .delete()

    return ok ? {
      success: true,
      message: 'Categoria removida com sucesso'
    } : {
      success: false,
      message: 'Não foi possível remover a categoria'
    }
  }
}
