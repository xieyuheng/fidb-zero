import Http from "node:http"
import type { Database } from "../database"

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
function handleRequest(db: Database, request: Http.IncomingMessage) {
  throw new Error("Function not implemented.")
}
