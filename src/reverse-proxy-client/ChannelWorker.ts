import { Socket } from "node:net"
import { multibufferEncode } from "../multibuffer"
import { lengthPrefixedDataStreamFromSocket } from "../multibuffer/lengthPrefixedDataStreamFromSocket"
import { streamGroup } from "../multibuffer/streamGroup"
import { streamMap } from "../multibuffer/streamMap"
import type { Message } from "../reverse-proxy/Message"
import { messageDecrypt } from "../reverse-proxy/messageDecrypt"
import { messageEncrypt } from "../reverse-proxy/messageEncrypt"
import { log } from "../utils/log"

export type ChannelWorker = {
  socket: Socket
  encryptionKey: Uint8Array
}

export function createChannelWorker(options: {
  hostname: string
  local: { hostname: string; port: number }
  channelTicket: {
    channelServerPort: number
    encryptionKeyText: string
    localServerId: string
  }
}): ChannelWorker {
  const who = "ChannelWorker"

  const { hostname, local, channelTicket } = options

  const encryptionKey = Buffer.from(channelTicket.encryptionKeyText, "hex")

  const socket = new Socket()

  socket.connect(channelTicket.channelServerPort, hostname)

  socket.setNoDelay()

  socket.on("close", () => {
    log({ who, message: "ChannelWorker socket closed" })
  })

  const firstData = new TextEncoder().encode(channelTicket.localServerId)

  socket.write(multibufferEncode([firstData]))

  channelSocketListen(socket, encryptionKey, local)

  return {
    socket,
    encryptionKey,
  }
}

async function channelSocketListen(
  channelSocket: Socket,
  encryptionKey: Uint8Array,
  local: { hostname: string; port: number },
): Promise<void> {
  const who = "channelSocketListen"

  const messageStream = streamMap(
    streamGroup(lengthPrefixedDataStreamFromSocket(channelSocket), 3),
    (parts) => messageDecrypt(Buffer.concat(parts), encryptionKey),
  )

  for await (const message of messageStream) {
    if (message.kind === "Request") {
      channelSocketReceive(channelSocket, encryptionKey, message, local)
    } else {
      log({
        who,
        kind: "Error",
        message: "unknown message kind",
        messageKind: message.kind,
      })
    }
  }
}

function channelSocketReceive(
  channelSocket: Socket,
  encryptionKey: Uint8Array,
  message: Message,
  local: { hostname: string; port: number },
): void {
  const who = "channelSocketReceive"

  const localSocket = new Socket()

  localSocket.connect(local.port, local.hostname, () => {
    log({
      who,
      message: "localSocket connected",
      local,
    })

    localSocket.write(message.body)

    log({
      who,
      message: "data sent to localSocket",
      sent: {
        length: message.body.length,
      },
    })
  })

  localSocket.on("data", (data) => {
    channelSocketSendMessage(channelSocket, encryptionKey, {
      kind: "Data",
      key: message.key,
      body: data,
    })
  })

  localSocket.on("end", () => {
    channelSocketSendMessage(channelSocket, encryptionKey, {
      kind: "End",
      key: message.key,
      body: new Uint8Array(),
    })
  })

  localSocket.on("close", () => {
    log({
      who,
      message: "localSocket closed",
      local,
    })
  })
}

async function channelSocketSendMessage(
  channelSocket: Socket,
  encryptionKey: Uint8Array,
  message: Message,
): Promise<void> {
  const who = "channelSocketSendMessage"

  try {
    channelSocket.write(await messageEncrypt(message, encryptionKey))
    log({
      who,
      kind: message.kind,
      key: new TextDecoder().decode(message.key),
    })
  } catch (error) {
    log({
      who,
      kind: "Error",
      message: (error as Error).message,
    })
  }
}
