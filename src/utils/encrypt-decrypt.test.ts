import { expect, test } from "vitest"
import { decrypt } from "./decrypt"
import { encrypt } from "./encrypt"

test("encrypt-decrypt", async () => {
  const data = new Uint8Array([1, 2, 3])
  const { encryptedData, key } = await encrypt(data)

  expect(encryptedData).not.toEqual(data)
  expect(await decrypt(encryptedData, key)).toEqual(data)
})
