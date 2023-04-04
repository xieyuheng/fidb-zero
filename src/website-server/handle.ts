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
import { globMatch } from "../utils/globMatch"
import type { Context } from "./Context"
import { readContent } from "./readContent"

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

  const corsHeaders = ctx.cors ? { "access-control-allow-origin": "*" } : {}

  let cacheControlHeaders: Record<string, string> = {}
  for (const [pattern, value] of Object.entries(ctx.cacheControlPatterns)) {
    if (globMatch(pattern, path)) {
      cacheControlHeaders["cache-control"] = value
    }
  }

  if (request.method === "GET") {
    const content =
      (await readContent(ctx, path)) ||
      (ctx.rewriteNotFoundTo
        ? await readContent(ctx, ctx.rewriteNotFoundTo)
        : undefined)

    if (content === undefined) {
      responseSetStatus(response, { code: 404 })
      responseSetHeaders(response, {
        ...corsHeaders,
        ...cacheControlHeaders,
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
          ...corsHeaders,
          ...cacheControlHeaders,
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
          ...corsHeaders,
          ...cacheControlHeaders,
          connection: "close",
        })
        response.write(await gzip(content.buffer))
        response.end()
        return
      }
    }

    responseSetStatus(response, { code: 200 })
    responseSetHeaders(response, {
      "content-type": content.type,
      ...corsHeaders,
      ...cacheControlHeaders,
      connection: "close",
    })
    response.write(content.buffer)
    response.end()
    return
  }

  throw new Error(
    [`[handle] unhandled http request`, `  method: ${request.method}`].join(
      "\n",
    ),
  )
}
