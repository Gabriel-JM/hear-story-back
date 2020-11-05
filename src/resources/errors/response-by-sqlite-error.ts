import { StringKeyAccess } from '../../protocols/utils'
import { HttpResponse } from '../http/http-response'

export const responseBySqliteError: StringKeyAccess = {
  SQLITE_CONSTRAINT(msg: string) {
    if(msg.includes('UNIQUE')) {
      return HttpResponse.notAcceptable({
        field: '',
        error: msg
      })
    }

    return this.SQLITE_ERROR(msg)
  },

  SQLITE_ERROR(msg: string) {
    return HttpResponse.serverError({
      field: '',
      error: msg
    })
  }
}
