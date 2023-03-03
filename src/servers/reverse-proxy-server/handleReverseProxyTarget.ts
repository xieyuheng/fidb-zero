import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import Net from "node:net"
import { requestJsonObject } from "../../server/requestJsonObject"
import { serverListen } from "../../server/serverListen"
import type { Json } from "../../utils/Json"
import { findPort } from "../../utils/node/findPort"
import type { Context } from "./Context"
import { keySize, ReverseProxyTarget } from "./ReverseProxyTarget"

export async function handleReverseProxyTarget(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  if (request.method === "POST") {
    const schema = ty.object({
      username: ty.string(),
      password: ty.string(),
    })

    const { username, password } = schema.validate(
      await requestJsonObject(request),
    )

    const server = Net.createServer((socket) => {
      ctx.targets[username] = new ReverseProxyTarget(socket)
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
