import type Http from "node:http"
import type { Database } from "../database"
import { exists } from "../db/utils/exists"
import { isDirectory } from "../db/utils/isDirectory"
import { isFile } from "../db/utils/isFile"
import { normalizePath } from "../db/utils/normalizePath"
import type { Json } from "../utils/Json"
import { requestQuery } from "../utils/requestQuery"
import { requestURL } from "../utils/requestURL"
import { handleRequestDirectory } from "./handleRequestDirectory"
import { handleRequestFile } from "./handleRequestFile"

export async function handleRequest(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Json | void> {
  const url = requestURL(request)
  const path = normalizePath(db, decodeURIComponent(url.pathname.slice(1)))

  const query = requestQuery(request)
  const kind = query.kind ? query.kind.toLowerCase() : ""

  // TODO Use `kind` on not exists.

  if (!(await exists(db, path))) {
    return await handleRequestDirectory(request, db, path)
  }

  if (await isDirectory(db, path)) {
    return await handleRequestDirectory(request, db, path)
  }

  if (await isFile(db, path)) {
    return await handleRequestFile(request, db, path)
  }

  throw new Error(
    [
      `[handleRequest] unhandled path type`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
