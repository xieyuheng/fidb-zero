import { Buffer } from "node:buffer"

export function randomRevision(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Buffer.from(array).toString("hex")
}
