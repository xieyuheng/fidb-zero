import { multibufferDecode } from "../multibuffer"
import type { Message } from "./Message"

export function messageDecode(buffer: Uint8Array): Message {
  const [kind, key, body] = multibufferDecode(buffer)
  return {
    kind: new TextDecoder().decode(kind),
    key,
    body,
  }
}
