import { Application } from 'express'
import { signupRoutes } from '../routes/signup/signup-routes'

export default (app: Application) => {
  app.use('/api/signup', signupRoutes)
}
