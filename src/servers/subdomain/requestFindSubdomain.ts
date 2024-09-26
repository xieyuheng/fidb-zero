import Http from "node:http"
import { requestBasedomain } from "../../utils/node/requestBasedomain.js"
import { requestHostname } from "../../utils/node/requestHostname.js"
import { requestSubdomain } from "../../utils/node/requestSubdomain.js"
import { type Context } from "./Context.js"
import { findSubdomain } from "./findSubdomain.js"

export async function requestFindSubdomain(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<string | undefined> {
  const hostname = requestHostname(request)
  const basedomain = requestBasedomain(request)

  const subdomain =
    ctx.domain === hostname
      ? "www"
      : ctx.domain === basedomain
        ? requestSubdomain(request, ctx.domain)
        : await findSubdomain(ctx.directory, hostname)

  return subdomain
}
