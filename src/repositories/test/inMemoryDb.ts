import Knex from 'knex'
import path from 'path'

export function inMemoryDb() {
  const databaseConfig = <Knex.Config> {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
      charset: 'utf8'
    },
    migrations: {
      extension: 'ts',
      directory: path.resolve('src', 'resources', 'database', 'migrations')
    },
    useNullAsDefault: true,
    log: {
      warn: () => null
    }
  }

  return Knex(databaseConfig)
}
