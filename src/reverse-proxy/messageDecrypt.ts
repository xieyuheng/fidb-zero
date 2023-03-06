import { multibufferDecode } from "../multibuffer"
import { decrypt } from "../utils/decrypt"
import type { Message } from "./Message"

export async function messageDecrypt(
  buffer: Uint8Array,
  encryptionKey: Uint8Array,
): Promise<Message> {
  const [isEnd, key, body] = multibufferDecode(buffer)

  return {
    isEnd: JSON.parse(
      new TextDecoder().decode(await decrypt(isEnd, encryptionKey)),
    ),
    key: await decrypt(key, encryptionKey),
    body: await decrypt(body, encryptionKey),
  }
}
