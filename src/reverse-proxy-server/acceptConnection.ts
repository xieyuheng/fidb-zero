import type { Socket } from "node:net"
import { createChannel } from "../reverse-proxy/Channel"
import { channelStart } from "../reverse-proxy/channelStart"
import { log } from "../utils/log"
import type { Context } from "./Context"

export function acceptConnection(
  ctx: Context,
  socket: Socket,
  encryptionKey: Uint8Array,
  options: { username: string; subdomain: string },
): void {
  const who = "acceptConnection"

  const { username, subdomain } = options

  socket.setNoDelay()

  log({
    who,
    message: "channel socket created",
    subdomain,
    username,
    socket: {
      localAddress: socket.localAddress,
      localPort: socket.localPort,
      localFamily: socket.localFamily,
      remoteAddress: socket.remoteAddress,
      remotePort: socket.remotePort,
      remoteFamily: socket.remoteFamily,
    },
  })

  socket.on("end", () => {
    log({ who, message: "channel socket end", subdomain, username })
    delete ctx.channels[subdomain]
  })

  const channel = createChannel(socket)

  ctx.channels[subdomain] = channel

  channelStart(channel, encryptionKey)
}
