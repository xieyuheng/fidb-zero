import type Http from "node:http"
import type { Socket } from "node:net"
import { NotFound } from "../errors/NotFound"
import { channelSend } from "../reverse-proxy/channelSend"
import { requestFormatRaw } from "../server/requestFormatRaw"
import type { Context } from "./Context"
import { requestSubdomain } from "./requestSubdomain"

export async function handleDispatch(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<void> {
  const subdomin = requestSubdomain(ctx, request)
  if (subdomin === undefined) {
    const host = request.headers["host"]
    throw new NotFound(`[handleDispatch] no subdomain in request host: ${host}`)
  }

  const channel = ctx.channels[subdomin]
  if (channel === undefined) {
    throw new NotFound(`[handleDispatch] unknown subdomain: ${subdomin}`)
  }

  const rawRequest = await requestFormatRaw(request)
  const data = await channelSend(channel, rawRequest)
  const socket = response.socket as Socket
  socket.end(data)
}
