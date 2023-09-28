import Http from "node:http"
import { Database } from "../../database"
import { requestResolvedPath } from "../../resources/requestResolvedPath"
import { resourceRoutes } from "../../resources/resourceRoutes"
import { handlePreflight } from "../../server/handlePreflight"
import { Json } from "../../utils/Json"
import { requestKind } from "../../utils/node/requestKind"

export async function handleDatabase(
  db: Database,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Uint8Array | void> {
  const who = "handleDatabase"

  if (request.method === "OPTIONS") {
    return handlePreflight(request, response)
  }

  const kind = requestKind(request)
  const handle = resourceRoutes[kind]

  if (handle === undefined) {
    throw new Error(
      [
        `[${who}] unhandled content-type`,
        ``,
        `  method: ${request.method}`,
        `  path: ${requestResolvedPath(db, request)}`,
      ].join("\n"),
    )
  }

  return await handle(db, request)
}
