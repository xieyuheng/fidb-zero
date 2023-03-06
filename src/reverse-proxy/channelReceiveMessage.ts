import { log } from "../utils/log"
import type { Channel } from "./Channel"
import type { Message } from "./Message"

export function channelReceiveMessage(
  channel: Channel,
  message: Message,
): void {
  const who = "channelReceiveMessage"

  log({
    who,
    kind: message.kind,
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
      messageKind: message.kind,
      key: new TextDecoder().decode(message.key),
      pending: Object.keys(channel.clientSockets),
    })

    return
  }

  if (message.kind === "End") {
    delete channel.clientSockets[keyText]
    clientSocket.end(message.body)
  } else if (message.kind === "Data") {
    clientSocket.write(message.body)
  } else {
    log({
      who,
      kind: "Error",
      message: "unhandled message kind",
      messageKind: message.kind,
      key: new TextDecoder().decode(message.key),
      pending: Object.keys(channel.clientSockets),
    })
  }
}
