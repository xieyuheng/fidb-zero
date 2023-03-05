import { Buffer } from "node:buffer"
import { log } from "../utils/log"
import type { Channel } from "./Channel"
import type { Message } from "./Message"

export function channelHandleMessage(channel: Channel, message: Message): void {
  const who = "channelHandleMessage"

  log({ who, keys: Object.keys(channel.handlers) })

  const keyText = new TextDecoder().decode(message.key)
  const handler = channel.handlers[keyText]
  if (handler === undefined) {
    console.error({
      who,
      message: "Can not find handler",
      key: message.key,
    })
  }

  if (message.isEnd) {
    delete channel.handlers[keyText]
    handler.ondata(Buffer.concat([...handler.parts, message.body]))
  } else {
    handler.parts.push(message.body)
  }
}
