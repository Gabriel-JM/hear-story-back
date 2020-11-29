import { Router } from 'express'
import { ExpressRouterAdapter } from '../../adapters/express-router-adapter'
import compose from '../../composers/login-controller-composer'

const loginRoutes = Router()
const loginController = compose()
const adapt = ExpressRouterAdapter(loginController)

loginRoutes.post('/', adapt(loginController.index))
loginRoutes.post('/refresh', adapt(loginController.refresh))

export { loginRoutes }
