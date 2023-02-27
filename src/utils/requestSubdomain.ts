import type Http from "node:http"

export function requestSubdomain(
  request: Http.IncomingMessage,
): string | undefined {
  const host = request.headers["host"]
  if (host === undefined) {
    return undefined
  }

  const parts = host.split(".")
  return parts[0]
}
