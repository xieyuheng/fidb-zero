import Http from "node:http"
import { dataOmitIdFromJson } from "../data"
import type { Database } from "../database"
import * as Db from "../db"
import { requestJsonObject } from "../utils/requestJsonObject"

async function handleRequest(db: Database, request: Http.IncomingMessage) {
  if (request.url === undefined) {
    throw new Error("[handleRequest] expect request.url")
  }

  if (request.headers["content-type"] !== "application/json") {
    throw new Error(
      `[handleRequest] expect content-type to be application/json, instead of ${request.headers["content-type"]}`,
    )
  }

  const url = new URL(request.url, `http://${request.headers.host}`)
  const id = url.pathname.slice(1)

  switch (request.method) {
    case "GET": {
      return await Db.get(db, url.pathname)
    }

    case "POST": {
      const json = await requestJsonObject(request)
      return await Db.create(db, { ...json, "@id": id })
    }

    case "PUT": {
      const json = await requestJsonObject(request)
      const input = dataOmitIdFromJson(json)
      return await Db.put(db, { ...input, "@id": id })
    }

    case "PATCH": {
      const json = await requestJsonObject(request)
      const input = dataOmitIdFromJson(json)
      return await Db.patch(db, { ...input, "@id": id })
    }

    case "DELETE": {
      const json = await requestJsonObject(request)
      const input = dataOmitIdFromJson(json)
      return await Db.delete(db, { ...input, "@id": id })
    }

    default: {
      throw new Error(
        `[handleRequest] unhandled http method: ${request.method}`,
      )
    }
  }
}
