import type Http from "node:http"
import { normalize } from "node:path"
import { requestURL } from "../../server/requestURL"
import type { Json } from "../../utils/Json"
import type { Context } from "./Context"

export async function handlePage(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const url = requestURL(request)
  // NOTE `decodeURIComponent` is necessary for space.
  const path = normalize(decodeURIComponent(url.pathname.slice(1)))

  console.log({ path })

  if (request.method === "GET") {
    return { path }
  }

  throw new Error(
    [`[handlePage] unhandled http request`, `  method: ${request.method}`].join(
      "\n",
    ),
  )
}
