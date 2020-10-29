import { StringKeyAccess } from '../utils'

export interface HttpRequest {
  params: StringKeyAccess,
  query: StringKeyAccess,
  body: object | object[]
}
