import { multibufferEncode } from "../multibuffer"
import type { Message } from "./Message"

export function messageEncode(message: Message): Uint8Array {
  return multibufferEncode([
    new TextEncoder().encode(message.kind),
    message.key,
    message.body,
  ])
}
