import type Http from "node:http"

export function requestURL(request: Http.IncomingMessage): URL {
  if (request.url === undefined) {
    throw new Error("[requestURL] expect request.url")
  }

  const url = new URL(request.url, `http://${request.headers.host}`)
  return url
}
