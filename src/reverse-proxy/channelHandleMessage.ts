import { log } from "../utils/log"
import type { Channel } from "./Channel"
import type { Message } from "./Message"

export function channelHandleMessage(channel: Channel, message: Message): void {
  const who = "channelHandleMessage"

  log({
    who,
    isEnd: message.isEnd,
    key: new TextDecoder().decode(message.key),
    pending: Object.keys(channel.clientSockets),
  })

  const keyText = new TextDecoder().decode(message.key)
  const clientSocket = channel.clientSockets[keyText]
  if (clientSocket === undefined) {
    log({
      who,
      kind: "Error",
      message: "can not find clientSocket, the client ended early",
      isEnd: message.isEnd,
      key: new TextDecoder().decode(message.key),
      pending: Object.keys(channel.clientSockets),
    })

    return
  }

  if (message.isEnd) {
    delete channel.clientSockets[keyText]
    clientSocket.end()
  } else {
    clientSocket.write(message.body)
  }
}
