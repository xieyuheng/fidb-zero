import type Http from "node:http"
import type { Socket } from "node:net"
import { NotFound } from "../errors/NotFound"
import { Processing } from "../errors/Processing"
import { requestFormatRaw } from "../server/requestFormatRaw"
import { randomHexString } from "../utils/randomHexString"
import { channelSendData } from "./channelSendData"
import type { Context } from "./Context"
import { requestSubdomain } from "./requestSubdomain"

export async function handleDispatch(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<void> {
  const who = "handleDispatch"

  const subdomin = requestSubdomain(ctx, request)
  if (subdomin === undefined) {
    const host = request.headers["host"]
    throw new NotFound(`[handleDispatch] no subdomain in request host: ${host}`)
  }

  const channel = ctx.channels[subdomin]
  if (channel === undefined) {
    throw new NotFound(`[handleDispatch] unknown subdomain: ${subdomin}`)
  }

  const serviece = ctx.broker.services.get(subdomin)
  // if (serviece === undefined) {
  //   throw new NotFound(`[handleDispatch] unknown subdomain: ${subdomin}`)
  // }

  const rawRequest = await requestFormatRaw(request)
  const socket = response.socket as Socket

  if (!socket) {
    throw new Error(`[${who}] no response.socket`)
  }

  channelSendData(channel, rawRequest, socket)

  const requestId = `${socket.remoteAddress}:${
    socket.remotePort
  }#${randomHexString(10)}`

  // serviece.requestSockets.set(requestId, socket)
  // serviece.requests.push({ requestId, request: rawRequest })

  throw new Processing(`[${who}]`)
}
