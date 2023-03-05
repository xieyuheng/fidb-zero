import { expect, test } from "vitest"
import { numberDecode, numberEncode } from "./numberEncode"

test("number-encode-decode", () => {
  expect(numberDecode(numberEncode(0))).toEqual(0)
  expect(numberDecode(numberEncode(1))).toEqual(1)
  expect(numberDecode(numberEncode(100))).toEqual(100)
  expect(numberDecode(numberEncode(1000000))).toEqual(1000000)
})
