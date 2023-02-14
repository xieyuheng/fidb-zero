import { Buffer } from "node:buffer"

export function randomHexString(size: number): string {
  const array = new Uint8Array(size)
  crypto.getRandomValues(array)
  return Buffer.from(array).toString("hex")
}
