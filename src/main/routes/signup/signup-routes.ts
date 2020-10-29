import { Router } from 'express'
import { ExpressRouterAdapter } from '../../adapters/express-router-adapter'
import compose from '../../composers/login-controller-composer'

const signupRoutes = Router()
const loginController = compose()
const adapt = ExpressRouterAdapter(loginController)

signupRoutes.post('/', adapt(loginController.create))

export { signupRoutes }
