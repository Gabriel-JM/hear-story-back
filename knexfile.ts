import path from 'path'

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve('src', 'resources', 'database', 'dev.db'),
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
