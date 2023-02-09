import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import { dataSchema } from "../data"
import type { Database } from "../database"
import * as Db from "../db"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"

export async function handleFile(
  request: Http.IncomingMessage,
  db: Database,
  id: string,
): Promise<Json | void> {
  if (request.method === "GET") {
    return await Db.get(db, id)
  }

  if (request.headers["content-type"] !== "application/json") {
    throw new Error(
      [
        `[handleFile] expect content-type to be application/json`,
        `  content-type: ${request.headers["content-type"]}`,
      ].join("\n"),
    )
  }

  if (request.method === "POST") {
    const json = await requestJsonObject(request)
    return await Db.create(db, { ...json, "@id": id })
  }

  const schema = ty.omitMany(dataSchema, ["@id", "@createdAt", "@updatedAt"])

  if (request.method === "PUT") {
    const json = await requestJsonObject(request)
    const input = schema.validate(json)
    return await Db.put(db, { ...input, "@id": id })
  }

  if (request.method === "PATCH") {
    const json = await requestJsonObject(request)
    const input = schema.validate(json)
    return await Db.patch(db, { ...input, "@id": id })
  }

  if (request.method === "DELETE") {
    const json = await requestJsonObject(request)
    const input = schema.validate(json)
    return await Db.delete(db, { ...input, "@id": id })
  }

  throw new Error(
    [
      `[handleFile] unhandled http request`,
      `  method: ${request.method}`,
      `  id: ${id}`,
    ].join("\n"),
  )
}
