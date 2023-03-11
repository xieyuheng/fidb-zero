import type { Message } from "../reverse-proxy/Message"
import { log } from "../utils/log"
import type { Channel } from "./Channel"

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
    if (message.kind === "End") {
      log({
        who,
        message: "the clientSocket ended quickly",
        messageKind: message.kind,
        key: new TextDecoder().decode(message.key),
        pending: Object.keys(channel.clientSockets),
      })
    } else {
      log({
        who,
        kind: "Error",
        message: "the clientSocket ended early",
        messageKind: message.kind,
        key: new TextDecoder().decode(message.key),
        pending: Object.keys(channel.clientSockets),
      })
    }

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
