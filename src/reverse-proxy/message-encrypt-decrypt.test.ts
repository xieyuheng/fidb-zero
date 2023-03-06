import { expect, test } from "vitest"
import { generateEncryptionKey } from "../utils/generateEncryptionKey"
import { messageDecrypt } from "./messageDecrypt"
import { messageEncrypt } from "./messageEncrypt"

test("message-encrypt-decrypt", async () => {
  const encryptionKey = await generateEncryptionKey()

  const message = {
    isEnd: false,
    key: new TextEncoder().encode("abc"),
    body: new Uint8Array([1, 2, 3]),
  }

  expect(message).toEqual(
    await messageDecrypt(
      await messageEncrypt(message, encryptionKey),
      encryptionKey,
    ),
  )
})
