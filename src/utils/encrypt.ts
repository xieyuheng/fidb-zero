import { byteArrayMerge } from "./byteArrayMerge"

// Learned from:
// - https://github.com/diafygi/webcrypto-examples#aes-gcm

export const ivLength = 12

export async function encrypt(data: Uint8Array): Promise<{
  encryptedData: Uint8Array
  key: Uint8Array
}> {
  const cryptoKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  )

  const exportedKey = await crypto.subtle.exportKey("raw", cryptoKey)

  const iv = crypto.getRandomValues(new Uint8Array(ivLength))

  const encryptedData = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cryptoKey, data),
  )

  const key = byteArrayMerge([iv, new Uint8Array(exportedKey)])

  return { encryptedData, key }
}
