import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import type { Json } from "../utils/Json"
import { requestURL } from "../utils/requestURL"
import { handleDirectory } from "./handleDirectory"
import { handleFile } from "./handleFile"

export async function handle(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Json | void> {
  const url = requestURL(request)
  const path = url.pathname.slice(1)

  if (await Db.isDirectory(db, path)) {
    return await handleDirectory(request, db, path)
  }

  if ((await Db.isFile(db, path)) || !(await Db.exists(db, path))) {
    return await handleFile(request, db, path)
  }
}
