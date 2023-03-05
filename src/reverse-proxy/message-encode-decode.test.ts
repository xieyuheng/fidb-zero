import { expect, test } from "vitest"
import { messageDecode } from "./messageDecode"
import { messageEncode } from "./messageEncode"

test("message-encode-decode", () => {
  const message = {
    isEnd: false,
    key: new TextEncoder().encode("abc"),
    body: new Uint8Array([1, 2, 3]),
  }

  expect(message).toEqual(messageDecode(messageEncode(message)))
})
