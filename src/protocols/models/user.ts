import { Entity } from './entity'

export interface User extends Entity {
  name: string
  email: string
  birthday: string
  username: string
  password: string
  privacyTerms: boolean
}
