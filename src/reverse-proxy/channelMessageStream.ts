import { byteArrayMerge } from "../multibuffer/byteArrayMerge"
import { messageDecode } from "../reverse-proxy/messageDecode"
import type { Channel } from "./Channel"

export async function* channelMessageStream(channel: Channel) {
  for await (const parts of channelDataPartsStream(channel, 3)) {
    yield messageDecode(Buffer.concat(parts))
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
  let buffer = new Uint8Array()
  let length = undefined

  for await (const data of channel.socket) {
    buffer = byteArrayMerge([buffer, data])
    length = new DataView(buffer.buffer).getUint32(buffer.byteOffset)

    while (length !== undefined && buffer.length >= length + 4) {
      yield buffer.subarray(0, length + 4)

      buffer = buffer.subarray(length + 4, buffer.byteLength)
      if (buffer.length < 4) {
        length = undefined
      } else {
        length = new DataView(buffer.buffer).getUint32(buffer.byteOffset)
      }
    }
  }
}
