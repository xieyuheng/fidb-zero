import Http from "node:http"
import { requestQuery } from "./requestQuery.js"

export function requestKind(request: Http.IncomingMessage): string {
  const query = requestQuery(request)
  const kind = query.kind ? query.kind.toLowerCase() : ""
  return kind
}
