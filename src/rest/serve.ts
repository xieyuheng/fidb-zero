import Http from "node:http"
import type { Database } from "../database"
import { requestJson } from "../utils/requestJson"

type ServeOptions = {
  hostname: string
  port: number
}

export async function serve(
  db: Database,
  options: ServeOptions,
): Promise<void> {
  const server = Http.createServer(async (request, response) => {
    try {
      const result = await handleRequest(request)
      const text = JSON.stringify(result, undefined, 2)
      response.statusCode = 200
      response.setHeader("Content-Type", "application/json")
      response.end(text)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Error"
      const result = { message }
      const text = JSON.stringify(result, undefined, 2)
      response.statusCode = 500
      response.setHeader("Content-Type", "application/json")
      response.end(text)
    }
  })

  server.listen(options.port, options.hostname, () => {
    console.log(`Server running at http://${options.hostname}:${options.port}/`)
  })
}

async function handleRequest(request: Http.IncomingMessage) {
  switch (request.method) {
    case "GET": {
      return {
        method: request.method,
        url: request.url,
        headers: request.headers,
      }
    }

    case "PUT":
    case "POST":
    case "PATCH": {
      return {
        method: request.method,
        url: request.url,
        headers: request.headers,
        json: await requestJson(request),
      }
    }

    default: {
      return {
        method: request.method,
        url: request.url,
        headers: request.headers,
      }
    }
  }
}
