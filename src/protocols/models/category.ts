import { Entity } from './entity'

export interface Category extends Entity {
  name: string
  color: string
  user: number
}
