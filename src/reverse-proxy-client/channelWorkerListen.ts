import { Socket } from "node:net"
import { lengthPrefixedDataStreamFromSocket } from "../multibuffer/lengthPrefixedDataStreamFromSocket"
import { streamGroup } from "../multibuffer/streamGroup"
import { streamMap } from "../multibuffer/streamMap"
import type { Message } from "../reverse-proxy/Message"
import { messageDecrypt } from "../reverse-proxy/messageDecrypt"
import { messageEncrypt } from "../reverse-proxy/messageEncrypt"
import { log } from "../utils/log"
import type { ChannelWorker } from "./ChannelWorker"

export async function channelWorkerListen(worker: ChannelWorker) {
  const who = "channelWorkerListen"

  const messageStream = streamMap(
    streamGroup(lengthPrefixedDataStreamFromSocket(worker.socket), 3),
    (parts) => messageDecrypt(Buffer.concat(parts), worker.encryptionKey),
  )

  for await (const message of messageStream) {
    if (message.kind === "Request") {
      channelSocketReceive(
        worker.socket,
        worker.encryptionKey,
        message,
        worker.local,
      )
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
