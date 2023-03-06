import { multibufferEncode } from "../multibuffer"
import type { Message } from "./Message"

export function messageEncrypt(
  message: Message,
  encryptionKey: Uint8Array,
): Uint8Array {
  return multibufferEncode([
    new TextEncoder().encode(JSON.stringify(message.isEnd)),
    message.key,
    message.body,
  ])
}
