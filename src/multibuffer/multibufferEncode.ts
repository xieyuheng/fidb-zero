import { byteArrayMerge } from "./byteArrayMerge"
import { numberDecode, numberEncode } from "./numberEncode"

export function multibufferEncode(parts: Array<Uint8Array>): Uint8Array {
  return byteArrayMerge(
    parts.flatMap((part) => [numberEncode(part.length), part]),
  )
}

export function multibufferDecode(multibuffer: Uint8Array): Array<Uint8Array> {
  const parts = []

  let index = 0
  while (index < multibuffer.length) {
    const length = numberDecode(multibuffer.subarray(index, index + 4))
    index += 4
    const part = multibuffer.subarray(index, index + length)
    index += length
    parts.push(part)
  }

  return parts
}
