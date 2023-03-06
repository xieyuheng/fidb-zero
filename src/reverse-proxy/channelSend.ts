import type { Buffer } from "node:buffer"
import { messageEncode } from "../reverse-proxy/messageEncode"
import { randomHexString } from "../utils/randomHexString"
import type { Channel, Handler } from "./Channel"

export function channelSend(
  channel: Channel,
  data: Buffer,
  handler: Handler,
): void {
  const keyText = randomHexString(16)
  const key = new TextEncoder().encode(keyText)

  channel.handlers[keyText] = handler
  channel.socket.write(
    messageEncode({
      isEnd: true,
      key,
      body: data,
    }),
  )
}
