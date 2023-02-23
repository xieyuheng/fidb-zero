import type Http from "node:http"
import type { Database } from "../database"
import { normalizePath } from "../db/utils/normalizePath"
import { requestURL } from "../utils/requestURL"

export function requestPath(
  request: Http.IncomingMessage,
  db: Database,
): string {
  const url = requestURL(request)
  const path = normalizePath(db, decodeURIComponent(url.pathname.slice(1)))
  return path
}
