import type Http from "node:http"
import { Data, dataOmitIdFromJson } from "../data"
import type { Database } from "../database"
import * as Db from "../db"
import { requestJsonObject } from "../utils/requestJsonObject"

export async function handle(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Data | void> {
  if (request.url === undefined) {
    throw new Error("[handleRequest] expect request.url")
  }

  const url = new URL(request.url, `http://${request.headers.host}`)
  const id = url.pathname.slice(1)

  if (request.method === "GET") {
    return await Db.get(db, id)
  }

  if (request.headers["content-type"] !== "application/json") {
    throw new Error(
      `[handleRequest] expect content-type to be application/json, instead of ${request.headers["content-type"]}`,
    )
  }

  if (request.method === "POST") {
    const input = await requestJsonObject(request)
    return await Db.create(db, { ...input, "@id": id })
  }

  if (request.method === "PUT") {
    const input = dataOmitIdFromJson(await requestJsonObject(request))
    return await Db.put(db, { ...input, "@id": id })
  }

  if (request.method === "PATCH") {
    const input = dataOmitIdFromJson(await requestJsonObject(request))
    return await Db.patch(db, { ...input, "@id": id })
  }

  if (request.method === "DELETE") {
    const input = dataOmitIdFromJson(await requestJsonObject(request))
    return await Db.delete(db, { ...input, "@id": id })
  }

  throw new Error(`[handleRequest] unhandled http method: ${request.method}`)
}
