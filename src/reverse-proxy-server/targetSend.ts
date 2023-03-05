import type { Buffer } from "node:buffer"
import { messageEncode } from "../reverse-proxy/messageEncode"
import { randomHexString } from "../utils/randomHexString"
import type { Target } from "./Target"

export async function targetSend(
  target: Target,
  data: Buffer,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const keyText = randomHexString(16)
    const key = new TextEncoder().encode(keyText)

    target.handlers[keyText] = {
      parts: [],
      ondata: (data) => resolve(data),
      onerror: (error) => reject(error),
    }

    target.socket.write(
      messageEncode({
        isEnd: true,
        key,
        body: data,
      }),
    )
  })
}
