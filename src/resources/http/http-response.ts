import { HttpResponseData } from '../../protocols/infra'

export class HttpResponse {
  static ok(body: object | object[]) {
    return <HttpResponseData> {
      status: 200,
      body
    }
  }

  static badRequest(error: Error | string) {
    return <HttpResponseData> {
      status: 400,
      body: {
        error: getErrorMessage(error)
      }
    }
  }

  static notFound(error: Error | string) {
    return <HttpResponseData> {
      status: 404,
      body: {
        error: getErrorMessage(error)
      }
    }
  }

  static notAcceptable(error: Error | string) {
    return <HttpResponseData> {
      status: 406,
      body: {
        error: getErrorMessage(error)
      }
    }
  }

  static serverError(error: Error | string) {
    return <HttpResponseData> {
      status: 500,
      body: {
        error: getErrorMessage(error)
      }
    }
  }
}

function getErrorMessage(error: Error | string) {
  return error instanceof Error ? error.message : error
}
