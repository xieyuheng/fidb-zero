import { multibufferDecode } from "../multibuffer"
import type { Message } from "./Message"

export function messageDecrypt(
  buffer: Uint8Array,
  encryptionKey: Uint8Array,
): Message {
  const [isEnd, key, body] = multibufferDecode(buffer)
  return {
    isEnd: JSON.parse(new TextDecoder().decode(isEnd)),
    key,
    body,
  }
}
