import type Http from "node:http"
import { requestURL } from "./requestURL"

export function requestQuery(
  request: Http.IncomingMessage,
): Record<string, string> {
  const url = requestURL(request)

  const query: Record<string, string> = {}
  for (const [key, value] of url.searchParams) {
    query[key] = value
  }

  return query
}
