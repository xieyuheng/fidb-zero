import { expect, test } from "vitest"
import { decrypt } from "./decrypt"
import { encrypt } from "./encrypt"

test("encrypt-decrypt", async () => {
  const data = new Uint8Array([1, 2, 3])
  const { encryptedData, encryptionKey: key } = await encrypt(data)

  expect(encryptedData).not.toEqual(data)
  expect(await decrypt(encryptedData, key)).toEqual(data)
})

test("encrypt-decrypt -- encrypt empty data", async () => {
  const emptyData = new Uint8Array([])
  const { encryptedData, encryptionKey: key } = await encrypt(emptyData)

  expect(encryptedData).not.toEqual(emptyData)
  expect(encryptedData.length).not.toEqual(0)
  expect(await decrypt(encryptedData, key)).toEqual(emptyData)
})

test("encrypt-decrypt -- different encrypted data each time", async () => {
  const data = new Uint8Array([1, 2, 3])

  const first = await encrypt(data)
  const second = await encrypt(data)

  expect(first.encryptedData).not.toEqual(second.encryptedData)
  expect(first.encryptionKey).not.toEqual(second.encryptionKey)

  expect(await decrypt(first.encryptedData, first.encryptionKey)).toEqual(data)
  expect(await decrypt(second.encryptedData, second.encryptionKey)).toEqual(
    data,
  )
})
