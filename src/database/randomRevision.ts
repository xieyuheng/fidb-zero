import { randomHexString } from "../utils/randomHexString.js"

export function randomRevision(): string {
  return randomHexString(16)
}
