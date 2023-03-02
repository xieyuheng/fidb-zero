import { randomHexString } from "../utils/node/randomHexString"

export function randomTokenName(): string {
  return randomHexString(16)
}
