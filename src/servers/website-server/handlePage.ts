import type Http from "node:http"
import { normalize } from "node:path"
import { requestURL } from "../../server/requestURL"
import { responseSend } from "../../server/responseSend"
import type { Json } from "../../utils/Json"
import type { Context } from "./Context"
import { readContent } from "./readContent"

export async function handlePage(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | void> {
  const url = requestURL(request)

  // NOTE `decodeURIComponent` is necessary for space.
  const path = normalize(decodeURIComponent(url.pathname.slice(1)))

  const corsHeaders = ctx.cors ? { "access-control-allow-origin": "*" } : {}

  if (request.method === "GET") {
    const content =
      (await readContent(ctx, path)) ||
      (ctx.rewriteNotFoundTo
        ? await readContent(ctx, ctx.rewriteNotFoundTo)
        : undefined)

    if (content === undefined) {
      responseSend(response, {
        status: { code: 404 },
        headers: {
          ...corsHeaders,
          connection: "close",
        },
      })

      return
    }

    responseSend(response, {
      status: { code: 200 },
      headers: {
        "content-type": content.type,
        ...corsHeaders,
        connection: "close",
      },
      body: content.buffer,
    })

    return
  }

  throw new Error(
    [`[handlePage] unhandled http request`, `  method: ${request.method}`].join(
      "\n",
    ),
  )
}
