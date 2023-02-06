import type Http from "node:http"
import type { Data } from "../data"
import type { Database } from "../database"
import * as Db from "../db"
import { handleDirectory } from "./handleDirectory"
import { handleFile } from "./handleFile"

export async function handle(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Data | void> {
  if (request.url === undefined) {
    throw new Error("[handle] expect request.url")
  }

  const url = new URL(request.url, `http://${request.headers.host}`)
  const path = url.pathname.slice(1)

  if (await Db.isDirectory(db, path)) {
    return await handleDirectory(request, db, path)
  }

  // NOTE Not exists or file.
  return await handleFile(request, db, path)
}
