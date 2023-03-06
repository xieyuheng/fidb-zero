import type { Buffer } from "node:buffer"
import type { Socket } from "node:net"
import { log } from "../utils/log"
import { randomHexString } from "../utils/randomHexString"
import type { Channel } from "./Channel"
import { messageEncrypt } from "./messageEncrypt"

export async function channelSend(
  channel: Channel,
  data: Buffer,
  clientSocket: Socket,
): Promise<void> {
  const who = "channelSend"

  const keyText = `${clientSocket.remoteAddress}:${
    clientSocket.remotePort
  }#${randomHexString(10)}`

  const key = new TextEncoder().encode(keyText)

  channel.clientSockets[keyText] = clientSocket

  clientSocket.on("end", () => {
    log({ who, message: "clientSocket ended", key: keyText })
    delete channel.clientSockets[keyText]
  })

  channel.socket.write(
    await messageEncrypt(
      {
        kind: "End",
        key,
        body: data,
      },
      channel.encryptionKey,
    ),
  )
}
