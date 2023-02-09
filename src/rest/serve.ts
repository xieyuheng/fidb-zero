import Http from "node:http"
import type { Database } from "../database"
import { handle } from "./handle"

type ServeOptions = {
  db: Database
  hostname: string
  port: number
}

export async function serve(options: ServeOptions): Promise<void> {
  const { db, hostname, port } = options

  const server = Http.createServer(async (request, response) => {
    try {
      if (request.method === "OPTIONS") {
        response.writeHead(200, {
          "access-control-allow-origin": request.headers["origin"] || "*",
          "access-control-allow-methods":
            request.headers["access-control-request-method"],
          "access-control-allow-headers":
            request.headers["access-control-request-headers"],
        })
        response.end()
        return
      }

      const result = await handle(request, db)
      if (result === undefined) {
        response.writeHead(204, {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
        })
        response.end()
        return
      }

      response.writeHead(200, {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      })
      response.write(JSON.stringify(result))
      response.end()
    } catch (error) {
      const result = {
        error: {
          message: error instanceof Error ? error.message : "Unknown Error",
        },
      }

      response.writeHead(500, {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      })
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
