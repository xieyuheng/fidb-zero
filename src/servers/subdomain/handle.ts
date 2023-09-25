import { Buffer } from "node:buffer"
import Http from "node:http"
import { handlePreflight } from "../../server/handlePreflight"
import { Json } from "../../utils/Json"
import { requestKind } from "../../utils/node/requestKind"
import { Context } from "./Context"

export async function handle(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  if (request.method === "OPTIONS") {
    return handlePreflight(request, response)
  }

  const kind = requestKind(request)

  // throw new Error(
  //   [
  //     `[subdomain/handle] unhandled content-type`,
  //     ``,
  //     `  method: ${request.method}`,
  //     `  path: ${requestPath(db, request)}`,
  //   ].join("\n"),
  // )
}
