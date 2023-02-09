import Http from "node:http"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { responseSend } from "../utils/responseSend"
import { handle } from "./handle"

type ServeOptions = {
  db: Database
  hostname: string
  port: number
}

export async function serve(options: ServeOptions): Promise<void> {
  const { db, hostname, port } = options

  const server = Http.createServer(async (request, response) => {
    if (request.method === "OPTIONS") {
      return preflight(request, response)
    }

    const headers = {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
    }

    try {
      const body = await handle(request, db)
      if (body === undefined) {
        responseSend(response, { status: 204, headers })
      } else {
        responseSend(response, { status: 200, headers, body })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Error"
      const body = { error: { message } }
      if (error instanceof NotFound) {
        responseSend(response, { status: 404, headers, body })
      } else {
        responseSend(response, { status: 500, headers, body })
      }
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

function preflight(
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): void {
  const preflightHeaders = {
    "access-control-allow-origin": request.headers["origin"],
    "access-control-allow-methods":
      request.headers["access-control-request-method"],
    "access-control-allow-headers":
      request.headers["access-control-request-headers"],
  }

  return responseSend(response, {
    headers: preflightHeaders,
  })
}
