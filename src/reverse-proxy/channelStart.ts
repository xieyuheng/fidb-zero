import { Buffer } from "node:buffer"
import { byteArrayMerge } from "../multibuffer/byteArrayMerge"
import { messageDecode } from "../reverse-proxy/messageDecode"
import type { Channel } from "./Channel"
import { channelHandleMessage } from "./channelHandleMessage"

export async function channelStart(channel: Channel): Promise<void> {
  for await (const message of reciveMessage(channel)) {
    channelHandleMessage(channel, message)
  }
}

async function* reciveMessage(channel: Channel) {
  let queue: Array<Uint8Array> = []
  for await (const data of reciveLengthPrefixedData(channel)) {
    queue.push(data)

    if (queue.length === 3) {
      yield messageDecode(Buffer.concat(queue))
      queue = []
    }
  }
}

async function* reciveLengthPrefixedData(channel: Channel) {
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
