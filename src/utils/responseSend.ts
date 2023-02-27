import type Http from "node:http"

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

  // NOTE We need to send one socket data,
  // to keep the proxy simple for now.

  // response.flushHeaders()

  if (options.body) {
    response.write(options.body)
  }

  response.end()
}
