import type { Socket } from "node:net"
import { dataStreamFromSocket } from "../multibuffer/dataStreamFromSocket"
import { streamGroup } from "../multibuffer/streamGroup"
import { streamMap } from "../multibuffer/streamMap"
import { createChannel } from "../reverse-proxy/Channel"
import { channelReceiveMessage } from "../reverse-proxy/channelReceiveMessage"
import { messageDecrypt } from "../reverse-proxy/messageDecrypt"
import { log } from "../utils/log"
import type { Context } from "./Context"

export async function acceptConnection(
  ctx: Context,
  socket: Socket,
  encryptionKey: Uint8Array,
  options: { username: string; subdomain: string },
): Promise<void> {
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
    log({ who, message: "channelSocket end", subdomain, username })
    delete ctx.channels[subdomain]
  })

  const channel = createChannel(socket, encryptionKey)

  ctx.channels[subdomain] = channel

  const mesageStream = streamMap(
    streamGroup(dataStreamFromSocket(channel.socket), 3),
    (parts) => messageDecrypt(Buffer.concat(parts), channel.encryptionKey),
  )

  const { value: mesage, done } = await mesageStream.next()

  if (done) {
    return
  }

  if (mesage.kind !== "LocalServerId") {
    log({
      who,
      kind: "Error",
      mesage: "first mesage is not LocalServerId",
      mesageKind: mesage.kind,
    })

    return
  }

  log({
    who,
    mesage: "receive LocalServerId",
    localServerId: new TextDecoder().decode(mesage.key),
  })

  for await (const message of mesageStream) {
    channelReceiveMessage(channel, message)
  }
}
