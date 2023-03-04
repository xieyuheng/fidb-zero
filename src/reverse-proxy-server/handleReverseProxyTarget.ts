import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import Net from "node:net"
import { requestToken } from "../database-server/requestToken"
import { requestJsonObject } from "../server/requestJsonObject"
import { serverListen } from "../server/serverListen"
import { tokenAssert } from "../token"
import type { Json } from "../utils/Json"
import { findPort } from "../utils/node/findPort"
import type { Context } from "./Context"
import { keySize, ReverseProxyTarget } from "./ReverseProxyTarget"

export async function handleReverseProxyTarget(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const token = await requestToken(ctx, request)

  if (request.method === "POST") {
    const schema = ty.object({
      subdomain: ty.string(),
      username: ty.string(),
    })

    const { subdomain, username } = schema.validate(
      await requestJsonObject(request),
    )

    const path = `users/${username}`

    tokenAssert(token, path, "read")

    const server = Net.createServer((socket) => {
      ctx.targets[subdomain] = new ReverseProxyTarget(socket)
    })

    const port = await findPort(9207)
    await serverListen(server, { port })
    return { port, keySize }
  }

  throw new Error(
    [
      `[handleReverseProxyTarget] unhandled http request`,
      `  method: ${request.method}`,
    ].join("\n"),
  )
}
