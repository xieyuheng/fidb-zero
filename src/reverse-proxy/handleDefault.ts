import type Http from "node:http"
import type { Socket } from "node:net"
import { requestFormatRaw } from "../utils/requestFormatRaw"
import type { Context } from "./Context"

export async function handleDefault(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<void> {
  const target = Object.values(ctx.targets)[0]

  await target.send(await requestFormatRaw(request), (data) => {
    const socket = response.socket as Socket
    socket.end(data)
  })
}
