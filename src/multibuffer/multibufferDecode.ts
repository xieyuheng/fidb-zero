import { numberDecode } from "./numberDecode"

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
