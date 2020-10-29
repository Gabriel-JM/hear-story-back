import { Request, Response } from 'express'
import { Controller, ControllerFunction, HttpRequest } from '../../protocols/infra'
import { StringKeyAccess } from '../../protocols/utils'

export function ExpressRouterAdapter(controller: Controller) {
  function adapt(routerFunc: ControllerFunction) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        params: req.params,
        query: req.query as StringKeyAccess,
        body: req.body
      }

      const adaptedFunc = routerFunc.bind(controller)
      const { status, body } = await adaptedFunc(httpRequest)

      res.status(status).json(body)
    }
  }

  return adapt
}
