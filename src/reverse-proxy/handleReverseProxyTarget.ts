import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import type { Context } from "./Context"
import { ReverseProxyTarget } from "./ReverseProxyTarget"

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

    ctx.targets[username] = new ReverseProxyTarget(request.socket)

    return
  }

  throw new Error(
    [
      `[handleReverseProxyTarget] unhandled http request`,
      `  method: ${request.method}`,
    ].join("\n"),
  )
}
