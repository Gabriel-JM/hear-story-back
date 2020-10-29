import { EnvironmentOptions } from '../protocols/infra'
import { connectionDatabase } from '../resources/database/connection'
import { app } from './app'

const env = process.env.NODE_ENV as EnvironmentOptions
const port  = process.env.PORT
const knexDb = connectionDatabase(env)

knexDb.migrate
  .latest()
  .then(() => {
    app.listen(port, () => {
      console.clear()
      console.log(`Server Started at: http://localhost:${port}`)
    })
  })
  .catch(error => {
    console.log('Start Error:', error.message)
  })
;
