import Knex from 'knex'
import { Repository } from '../../protocols/infra'
import { User } from '../../protocols/models'

export class LoginRepository implements Repository<User> {
  constructor(
    private readonly table: string,
    private readonly knex: Knex<User>
  ) {}

  async findByUsername(username: string) {
    const [user] = await this.knex(this.table).where({ username })

    return user
  }

  async save(user: User) {
    const [newUserId] = await this.knex(this.table).insert(user)

    const [newUser] = await this.knex(this.table).where({ id: newUserId })

    return newUser
  }
}
