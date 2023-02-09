import type Http from "node:http"
import type { Json } from "./Json"

export function responseSend(
  response: Http.ServerResponse,
  options: {
    status?: number
    headers?: Record<string, string | undefined>
    body?: Json
  },
) {
  response.writeHead(options.status || 200, options.headers || {})

  if (options.body) {
    const text = JSON.stringify(options.body)
    response.write(text)
  }

  response.end()
}
