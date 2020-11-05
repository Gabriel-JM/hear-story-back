import { HttpFieldError, HttpResponseData } from '../../protocols/infra'

export class HttpResponse {
  static ok(body: object | object[]) {
    return <HttpResponseData> {
      status: 200,
      body
    }
  }

  static badRequest(error: HttpFieldError) {
    return <HttpResponseData> {
      status: 400,
      body: error
    }
  }

  static notFound(error: HttpFieldError) {
    return <HttpResponseData> {
      status: 404,
      body: error
    }
  }

  static notAcceptable(error: HttpFieldError) {
    return <HttpResponseData> {
      status: 406,
      body: error
    }
  }

  static serverError(error: HttpFieldError) {
    return <HttpResponseData> {
      status: 500,
      body: error
    }
  }
}
