import { multibufferEncode } from "../multibuffer"
import { encrypt } from "../utils/encrypt"
import type { Message } from "./Message"

export async function messageEncrypt(
  message: Message,
  encryptionKey: Uint8Array,
): Promise<Uint8Array> {
  return multibufferEncode([
    await encrypt(
      new TextEncoder().encode(JSON.stringify(message.isEnd)),
      encryptionKey,
    ),
    await encrypt(message.key, encryptionKey),
    await encrypt(message.body, encryptionKey),
  ])
}
