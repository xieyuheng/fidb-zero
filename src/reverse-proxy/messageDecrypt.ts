import { multibufferDecode } from "../multibuffer"
import { decrypt } from "../utils/decrypt"
import type { Message } from "./Message"

export async function messageDecrypt(
  buffer: Uint8Array,
  encryptionKey: Uint8Array,
): Promise<Message> {
  const [kind, key, body] = multibufferDecode(buffer)

  return {
    kind: new TextDecoder().decode(kind),
    key,
    body: await decrypt(body, encryptionKey),
  }
}
