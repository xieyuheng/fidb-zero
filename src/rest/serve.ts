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
      const result = await handle(request, db)
      if (result === undefined) {
        response.writeHead(404)
        response.end()
        return
      }

      response.writeHead(200, { "content-type": "application/json" })
      response.write(JSON.stringify(result))
      response.end()
    } catch (error) {
      const result = {
        error: {
          message: error instanceof Error ? error.message : "Unknown Error",
        },
      }

      response.writeHead(500, { "content-type": "application/json" })
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
