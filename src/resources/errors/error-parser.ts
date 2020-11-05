import { HttpResponseData } from '../../protocols/infra'
import { SqliteError } from '../../protocols/utils'
import { HttpResponse } from '../http/http-response'
import { responseBySqliteError } from './response-by-sqlite-error'

export class ErrorParser {
  static catch(err: Error | SqliteError): HttpResponseData {
    if('code' in err) {
      const { code, message } = err as SqliteError
      return responseBySqliteError[code](message)
    }

    return HttpResponse.serverError({
      field: '',
      error: err.message
    })
  }
}
