import { byteArrayMerge } from "../utils/byteArrayMerge"
import type { Channel } from "./Channel"
import { messageDecrypt } from "./messageDecrypt"

export async function* channelMessageStream(channel: Channel) {
  for await (const parts of channelDataPartsStream(channel, 3)) {
    yield await messageDecrypt(Buffer.concat(parts), channel.encryptionKey)
  }
}

async function* channelDataPartsStream(channel: Channel, length: number) {
  let parts: Array<Uint8Array> = []
  for await (const data of channelLengthPrefixedDataStream(channel)) {
    parts.push(data)

    if (parts.length === length) {
      yield parts
      parts = []
    }
  }
}

async function* channelLengthPrefixedDataStream(channel: Channel) {
  const prefixLength = 4

  let buffer = new Uint8Array()
  let length = undefined

  for await (const data of channel.socket) {
    buffer = byteArrayMerge([buffer, data])
    length = new DataView(buffer.buffer).getUint32(buffer.byteOffset)

    while (length !== undefined && buffer.length >= length + prefixLength) {
      yield buffer.subarray(0, length + prefixLength)

      buffer = buffer.subarray(length + prefixLength, buffer.byteLength)
      if (buffer.length < prefixLength) {
        length = undefined
      } else {
        length = new DataView(buffer.buffer).getUint32(buffer.byteOffset)
      }
    }
  }
}
