import type { Buffer } from "node:buffer"
import type { Socket } from "node:net"
import { messageEncrypt } from "../reverse-proxy/messageEncrypt"
import { log } from "../utils/log"
import { randomHexString } from "../utils/randomHexString"
import type { Channel } from "./Channel"

export async function channelSendData(
  channel: Channel,
  data: Buffer,
  clientSocket: Socket,
): Promise<void> {
  const who = "channelSendData"

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
        kind: "Request",
        key,
        body: data,
      },
      channel.encryptionKey,
    ),
  )
}
