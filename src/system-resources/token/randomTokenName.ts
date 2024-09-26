import { randomHexString } from "../../utils/randomHexString.js"

export function randomTokenName(): string {
  return randomHexString(16)
}
