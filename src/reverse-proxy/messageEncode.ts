import { multibufferEncode } from "../multibuffer"
import type { Message } from "./Message"

export function messageEncode(message: Message): Uint8Array {
  return multibufferEncode([
    new TextEncoder().encode(JSON.stringify(message.isEnd)),
    new TextEncoder().encode(message.key),
    message.body,
  ])
}
