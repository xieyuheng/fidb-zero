import { Buffer } from "node:buffer"
import Http from "node:http"
import { requestBytes } from "./requestBytes"

export async function requestFormatRaw(
  request: Http.IncomingMessage,
): Promise<Buffer> {
  const requestLine = `${request.method} ${request.url} HTTP/${request.httpVersion}`

  const headerLines: Array<string> = []

  for (const [index, value] of request.rawHeaders.entries()) {
    if (index % 2 === 0) {
      headerLines.push(value)
    } else {
      const line = headerLines.pop()
      headerLines.push(`${line}: ${value}`)
    }
  }

  const head = [requestLine, ...headerLines].join("\r\n")

  return Buffer.concat([
    new TextEncoder().encode(head),
    new TextEncoder().encode("\r\n"),
    new TextEncoder().encode("\r\n"),
    await requestBytes(request),
  ])
}
