import type Http from "node:http"
import type { Json } from "./Json"

export function responseSendJson(
  response: Http.ServerResponse,
  options: {
    status?: {
      code?: number
      message?: string
    }
    headers?: Record<string, string | undefined>
    body?: Json
  },
) {
  if (options.status?.code) {
    response.statusCode = options.status.code
  }

  if (options.status?.message) {
    const message = options.status.message.replaceAll("\n", "; ")
    response.statusMessage = message
  }
  if (options.headers) {
    for (const [name, value] of Object.entries(options.headers))
      if (value !== undefined) {
        response.setHeader(name, value)
      }
  }

  if (options.body) {
    response.write(JSON.stringify(options.body))
  }

  response.end()
}
