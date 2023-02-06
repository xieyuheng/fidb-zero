import Http from "node:http"
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
      response.writeHead(200, {
        "Content-Type": "application/json",
      })
      response.end(JSON.stringify(result))
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Error"
      const result = { message }
      response.writeHead(500, {
        "Content-Type": "application/json",
      })
      response.end(JSON.stringify(result))
    }
  })

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })
}

async function handleRequest(db: Database, request: Http.IncomingMessage) {
  if (request.url === undefined) throw new Error("expect request.url")

  const url = new URL(request.url, `http://${request.headers.host}`)

  switch (request.method) {
    case "GET": {
      return await Db.get(db, url.pathname)
    }

    case "PUT": {
      const input = await requestJsonObject(request)
      return await Db.put(db, { ...input, "@id": url.pathname })
    }

    default: {
      return {
        url: request.url,
        headers: request.headers,
      }
    }
  }
}
