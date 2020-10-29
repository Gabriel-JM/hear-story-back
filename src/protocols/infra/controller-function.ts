import { HttpRequest } from './http-request'
import { HttpResponseData } from './http-response-data'

export type ControllerFunction = (httpRequest: HttpRequest) => Promise<HttpResponseData>
