import type Http from "node:http"
import { responseSetHeaders } from "./responseSetHeaders"
import { responseSetStatus } from "./responseSetStatus"

export function responseSend(
  response: Http.ServerResponse,
  options: {
    status?: {
      code?: number
      message?: string
    }
    headers?: Record<string, string | undefined>
    body?: Buffer | string
  },
) {
  if (options.status) {
    responseSetStatus(response, options.status)
  }

  if (options.headers) {
    responseSetHeaders(response, options.headers)
  }

  if (options.body) {
    response.write(options.body)
  }

  response.end()
}
