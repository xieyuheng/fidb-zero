import type { Socket } from "node:net"
import { multibufferDecode } from "../multibuffer"
import { lengthPrefixedDataStreamFromSocket } from "../multibuffer/lengthPrefixedDataStreamFromSocket"
import { streamGroup } from "../multibuffer/streamGroup"
import { streamMap } from "../multibuffer/streamMap"
import { messageDecrypt } from "../reverse-proxy/messageDecrypt"
import { log } from "../utils/log"
import { createChannel } from "./Channel"
import { channelReceiveMessage } from "./channelReceiveMessage"
import type { Context } from "./Context"

export async function acceptConnection(
  ctx: Context,
  socket: Socket,
): Promise<void> {
  const who = "acceptConnection"

  socket.setNoDelay()

  log({
    who,
    message: "channel socket created",
    socket: {
      localAddress: socket.localAddress,
      localPort: socket.localPort,
      localFamily: socket.localFamily,
      remoteAddress: socket.remoteAddress,
      remotePort: socket.remotePort,
      remoteFamily: socket.remoteFamily,
    },
  })

  const dataStream = lengthPrefixedDataStreamFromSocket(socket)

  const { value, done } = await dataStream.next()

  if (done) {
    return
  }

  const [firstData] = multibufferDecode(value)
  const workerId = new TextDecoder().decode(firstData)

  const channelInfo = ctx.channelInfos[workerId]

  if (channelInfo === undefined) {
    log({ who, message: "unknown workerId", workerId })
    return
  }

  const { username, subdomain, encryptionKey } = channelInfo

  const channel = createChannel(socket, encryptionKey)

  ctx.channels[subdomain] = channel

  log({ who, message: "channel created", subdomain, username })

  socket.on("end", () => {
    log({ who, message: "channelSocket end", subdomain, username })
    delete ctx.channels[subdomain]
  })

  const mesageStream = streamMap(streamGroup(dataStream, 3), (parts) =>
    messageDecrypt(Buffer.concat(parts), channel.encryptionKey),
  )

  for await (const message of mesageStream) {
    channelReceiveMessage(channel, message)
  }
}
