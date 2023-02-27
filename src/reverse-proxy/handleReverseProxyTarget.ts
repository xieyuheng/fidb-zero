import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import type { Context } from "./Context"
import { ReverseProxyWaiter } from "./ReverseProxyWaiter"

export async function handleReverseProxyTarget(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | void> {
  if (request.method === "POST") {
    const schema = ty.object({
      username: ty.string(),
      password: ty.string(),
    })

    const { username, password } = schema.validate(
      await requestJsonObject(request),
    )

    ctx.targets[username] = {
      socket: request.socket,
      waiter: new ReverseProxyWaiter(request.socket),
    }

    // TODO

    return
  }

  throw new Error(
    [
      `[handleReverseProxyTarget] unhandled http request`,
      `  method: ${request.method}`,
    ].join("\n"),
  )
}
