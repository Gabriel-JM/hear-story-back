import { Entity } from '../models'
import { ControllerFunction } from './controller-function'

export interface Controller {
  index?: ControllerFunction
  show?: ControllerFunction
  create?: ControllerFunction
  update?: ControllerFunction
  delete?: ControllerFunction
}
