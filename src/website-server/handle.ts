import type { Buffer } from "node:buffer"
import type Http from "node:http"
import { normalize } from "node:path"
import { promisify } from "node:util"
import Zlib from "node:zlib"
import { handlePreflight } from "../server/handlePreflight"
import { requestURL } from "../server/requestURL"
import { responseSetHeaders } from "../server/responseSetHeaders"
import { responseSetStatus } from "../server/responseSetStatus"
import type { Json } from "../utils/Json"
import type { Context } from "./Context"
import { readContentWithRewrite } from "./readContentWithRewrite"
import { responseSetCacheControlHeaders } from "./responseSetCacheControlHeaders"
import { responseSetCorsHeaders } from "./responseSetCorsHeaders"

const brotliCompress = promisify(Zlib.brotliCompress)
const gzip = promisify(Zlib.gzip)

export async function handle(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  if (ctx.cors) {
    if (request.method === "OPTIONS") {
      return handlePreflight(request, response)
    }
  }

  const url = requestURL(request)
  // NOTE `decodeURIComponent` is necessary for space.
  const path = normalize(decodeURIComponent(url.pathname.slice(1)))

  responseSetCorsHeaders(ctx, response)
  responseSetCacheControlHeaders(ctx, response, path)

  if (request.method === "GET") {
    const content = await readContentWithRewrite(ctx, path)

    if (content === undefined) {
      responseSetStatus(response, { code: 404 })
      responseSetHeaders(response, {
        connection: "close",
      })
      response.end()
      return
    }

    if (typeof request.headers["accept-encoding"] === "string") {
      const encodings = request.headers["accept-encoding"].split(",")

      if (encodings.find((encoding) => encoding.trim().startsWith("br"))) {
        responseSetStatus(response, { code: 200 })
        responseSetHeaders(response, {
          "content-type": content.type,
          "content-encoding": "br",
          connection: "close",
        })
        response.write(await brotliCompress(content.buffer))
        response.end()
        return
      }

      if (encodings.find((encoding) => encoding.trim().startsWith("gzip"))) {
        responseSetStatus(response, { code: 200 })
        responseSetHeaders(response, {
          "content-type": content.type,
          "content-encoding": "gzip",
          connection: "close",
        })
        response.end(await gzip(content.buffer))
        return
      }
    }

    responseSetStatus(response, { code: 200 })
    responseSetHeaders(response, {
      "content-type": content.type,
      connection: "close",
    })
    response.end(content.buffer)
    return
  }

  throw new Error(
    [`[handle] unhandled http request`, `  method: ${request.method}`].join(
      "\n",
    ),
  )
}
