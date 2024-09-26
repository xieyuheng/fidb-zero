import Http from "node:http"
import { type Database } from "../../database/index.js"
import { requestResolvedPath } from "../../resources/requestResolvedPath.js"
import { resourceRoutes } from "../../resources/resourceRoutes.js"
import { handlePreflight } from "../../server/handlePreflight.js"
import { type Json } from "../../utils/Json.js"
import { requestKind } from "../../utils/node/requestKind.js"

export async function handleDatabase(
  db: Database,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Uint8Array | void> {
  const who = "handleDatabase.js"

  if (request.method === "OPTIONS") {
    return handlePreflight(request, response)
  }

  const kind = requestKind(request)
  const handle = resourceRoutes[kind]

  if (handle === undefined) {
    throw new Error(
      [
        `[${who}] unhandled resource kind.`,
        ``,
        `  kind: ${String(kind)}`,
        `  method: ${request.method}`,
        `  path: ${requestResolvedPath(db, request)}`,
      ].join("\n"),
    )
  }

  return await handle(db, request)
}
