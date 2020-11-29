import { Application } from 'express'
import { categoriesRoutes } from '../routes/categories/categories-routes'
import { loginRoutes } from '../routes/login/login-routes'
import { signupRoutes } from '../routes/signup/signup-routes'

export default (app: Application) => {
  app.use('/api/register', signupRoutes)
  app.use('/api/login', loginRoutes)
  app.use('/api/categories', categoriesRoutes)
}
