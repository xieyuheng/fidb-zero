import type Http from "node:http"
import { normalizePath } from "../db/utils/normalizePath"
import { requestURL } from "../utils/requestURL"
import type { Context } from "./handleRequest"

export function requestPath(
  ctx: Context,
  request: Http.IncomingMessage,
): string {
  const url = requestURL(request)
  const path = normalizePath(ctx.db, decodeURIComponent(url.pathname.slice(1)))
  return path
}
