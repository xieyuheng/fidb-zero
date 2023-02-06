import type Http from "node:http"
import { dataOmitIdFromJson } from "../data"
import type { Database } from "../database"
import * as Db from "../db"
import { requestJsonObject } from "../utils/requestJsonObject"

export async function handleRequest(
  db: Database,
  request: Http.IncomingMessage,
) {
  if (request.url === undefined) {
    throw new Error("[handleRequest] expect request.url")
  }

  const url = new URL(request.url, `http://${request.headers.host}`)
  const id = url.pathname.slice(1)

  if (request.method === "GET") {
    return await Db.get(db, url.pathname)
  }

  if (request.headers["content-type"] !== "application/json") {
    throw new Error(
      `[handleRequest] expect content-type to be application/json, instead of ${request.headers["content-type"]}`,
    )
  }

  if (request.method === "POST") {
    const json = await requestJsonObject(request)
    return await Db.create(db, { ...json, "@id": id })
  }

  if (request.method === "PUT") {
    const json = await requestJsonObject(request)
    const input = dataOmitIdFromJson(json)
    return await Db.put(db, { ...input, "@id": id })
  }

  if (request.method === "PATCH") {
    const json = await requestJsonObject(request)
    const input = dataOmitIdFromJson(json)
    return await Db.patch(db, { ...input, "@id": id })
  }

  if (request.method === "DELETE") {
    const json = await requestJsonObject(request)
    const input = dataOmitIdFromJson(json)
    return await Db.delete(db, { ...input, "@id": id })
  }

  throw new Error(`[handleRequest] unhandled http method: ${request.method}`)
}
