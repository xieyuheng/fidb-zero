import Http from "node:http"
import { dataOmitIdFromJson } from "../data"
import type { Database } from "../database"
import * as Db from "../db"
import { requestJsonObject } from "../utils/requestJsonObject"

type ServeOptions = {
  db: Database
  hostname: string
  port: number
}

export async function serve(options: ServeOptions): Promise<void> {
  const { db, hostname, port } = options

  const server = Http.createServer(async (request, response) => {
    try {
      const result = await handleRequest(db, request)
      const headers = { "Content-Type": "application/json" }
      response.writeHead(200, headers)
      response.write(JSON.stringify(result))
      response.end()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Error"
      const result = { message }
      const headers = { "Content-Type": "application/json" }
      response.writeHead(500, headers)
      response.write(JSON.stringify(result))
      response.end()
    }
  })

  server.listen(port, hostname, () => {
    console.log({
      message: `[serve] start`,
      url: `http://${hostname}:${port}`,
      options,
    })
  })
}

async function handleRequest(db: Database, request: Http.IncomingMessage) {
  if (request.url === undefined) {
    throw new Error("[handleRequest] expect request.url")
  }

  const url = new URL(request.url, `http://${request.headers.host}`)
  const id = url.pathname.slice(1)

  switch (request.method) {
    case "GET": {
      return await Db.get(db, url.pathname)
    }

    case "PUT": {
      const input = await requestJsonObject(request)
      return await Db.put(db, { ...input, "@id": id })
    }

    case "POST": {
      const input = await requestJsonObject(request)
      return await Db.create(db, id, input)
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
