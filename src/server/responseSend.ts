import type Http from "node:http"
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
    for (const [name, value] of Object.entries(options.headers))
      if (value !== undefined) {
        response.setHeader(name, value)
      }
  }

  if (options.body) {
    response.write(options.body)
  }

  response.end()
}
