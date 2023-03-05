import type Http from "node:http"
import type { Socket } from "node:net"
import { NotFound } from "../errors/NotFound"
import { requestFormatRaw } from "../server/requestFormatRaw"
import type { Context } from "./Context"
import { requestSubdomain } from "./requestSubdomain"
import { targetSend } from "./Target"

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

  const target = ctx.targets[subdomin]
  if (target === undefined) {
    throw new NotFound(`[handleDispatch] unknown subdomain: ${subdomin}`)
  }

  const rawRequest = await requestFormatRaw(request)
  const data = await targetSend(target, rawRequest)
  const socket = response.socket as Socket
  socket.end(data)
}
