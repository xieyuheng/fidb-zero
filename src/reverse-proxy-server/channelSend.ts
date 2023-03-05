import type { Buffer } from "node:buffer"
import { messageEncode } from "../reverse-proxy/messageEncode"
import { randomHexString } from "../utils/randomHexString"
import type { Channel } from "./Channel"

export async function channelSend(
  channel: Channel,
  data: Buffer,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const keyText = randomHexString(16)
    const key = new TextEncoder().encode(keyText)

    channel.handlers[keyText] = {
      parts: [],
      ondata: (data) => resolve(data),
      onerror: (error) => reject(error),
    }

    channel.socket.write(
      messageEncode({
        isEnd: true,
        key,
        body: data,
      }),
    )
  })
}
