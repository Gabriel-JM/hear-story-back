import Knex from 'knex'
import path from 'path'
import { EnvironmentOptions } from '../../protocols/infra'

const dbNames = {
  development: path.join(__dirname, 'dev.db'),
  test: path.join(__dirname, 'test.db')
}

export function connectionDatabase(databaseEnv: EnvironmentOptions) {
  const databaseConfig = <Knex.Config> {
    client: 'sqlite3',
    connection: {
      filename: dbNames[databaseEnv],
      charset: 'utf8'
    },
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, 'migrations')
    },
    useNullAsDefault: true,
    log: {
      warn: () => null
    }
  }

  return Knex(databaseConfig)
}
