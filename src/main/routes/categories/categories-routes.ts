import { Router } from 'express'
import { ExpressRouterAdapter } from '../../adapters/express-router-adapter'
import compose from '../../composers/categories-controller-composer'

const categoriesRoutes = Router()
const categoriesController = compose()
const adapt = ExpressRouterAdapter(categoriesController)

categoriesRoutes.get('/', adapt(categoriesController.index))
categoriesRoutes.get('/:id', adapt(categoriesController.show))
categoriesRoutes.post('/', adapt(categoriesController.create))
categoriesRoutes.put('/:id', adapt(categoriesController.update))
categoriesRoutes.delete('/:id', adapt(categoriesController.destroy))

export { categoriesRoutes }
