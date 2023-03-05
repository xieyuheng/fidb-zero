import { multibufferDecode } from "../multibuffer"
import type { Message } from "./Message"

export function messageDecode(buffer: Uint8Array): Message {
  const [isEnd, key, body] = multibufferDecode(buffer)
  return {
    isEnd: JSON.parse(new TextDecoder().decode(isEnd)),
    key: new TextDecoder().decode(key),
    body,
  }
}
