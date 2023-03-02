import { randomHexString } from "../utils/node/randomHexString"

export function randomRevision(): string {
  return randomHexString(16)
}
