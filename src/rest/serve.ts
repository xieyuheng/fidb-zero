import Http from "node:http"
import type { Database } from "../database"
import { handleRequest } from "./handleRequest"

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

      const headers = { "content-type": "application/json" }

      response.writeHead(200, headers)
      response.write(JSON.stringify(result))
      response.end()
    } catch (error) {
      console.error(error)

      const result = {
        error: {
          message: error instanceof Error ? error.message : "Unknown Error",
        },
      }

      const headers = { "content-type": "application/json" }

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
