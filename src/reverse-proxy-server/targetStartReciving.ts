import { Buffer } from "node:buffer"
import { byteArrayMerge } from "../multibuffer/byteArrayMerge"
import { messageDecode } from "../reverse-proxy/messageDecode"
import { log } from "../utils/log"
import type { Target } from "./Target"

export async function targetStartReciving(target: Target): Promise<void> {
  for await (const message of reciveMessage(target)) {
    log({
      who: "Target",
      keys: Object.keys(target.handlers),
    })

    const keyText = new TextDecoder().decode(message.key)
    const handler = target.handlers[keyText]
    if (handler === undefined) {
      console.error({
        who: "[Target]",
        message: "Can not find handler",
        key: message.key,
      })
    }

    if (message.isEnd) {
      delete target.handlers[keyText]
      handler.ondata(Buffer.concat([...handler.parts, message.body]))
    } else {
      handler.parts.push(message.body)
    }
  }
}

async function* reciveLengthPrefixedData(target: Target) {
  let buffer = new Uint8Array()
  let length = undefined

  for await (const data of target.socket) {
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

async function* reciveMessage(target: Target) {
  let queue: Array<Uint8Array> = []
  for await (const data of reciveLengthPrefixedData(target)) {
    queue.push(data)

    if (queue.length === 3) {
      yield messageDecode(Buffer.concat(queue))
      queue = []
    }
  }
}
