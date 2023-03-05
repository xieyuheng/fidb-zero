import { expect, test } from "vitest"
import { multibufferDecode, multibufferEncode } from "../multibuffer"

test("multibuffer-encode-decode", () => {
  const parts = [
    new Uint8Array([1, 2, 3]),
    new Uint8Array([4, 5, 6]),
    new Uint8Array([7, 8, 9]),
  ]

  const buffer = multibufferEncode(parts)

  const decodedParts = multibufferDecode(buffer)

  expect(parts).toEqual(decodedParts)
})
