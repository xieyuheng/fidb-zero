import { Buffer } from "node:buffer"
import type { Socket } from "node:net"
import { byteArrayMerge } from "../multibuffer/byteArrayMerge"
import { messageDecode } from "../reverse-proxy/messageDecode"
import { messageEncode } from "../reverse-proxy/messageEncode"
import { randomHexString } from "../utils/randomHexString"

type DataHandler = (data: Uint8Array) => void

export class ReverseProxyTarget {
  private queue: Record<
    string,
    {
      handler: DataHandler
      parts: Array<Uint8Array>
    }
  > = {}

  constructor(public socket: Socket) {
    this.startReciving()
  }

  async *reciveData() {
    for await (const data of this.socket) {
      yield data
    }
  }

  async *reciveLengthPrefixedData() {
    let buffer = new Uint8Array()
    let length = undefined

    for await (const data of this.reciveData()) {
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

  async *reciveMessage() {
    let queue: Array<Uint8Array> = []
    for await (const data of this.reciveLengthPrefixedData()) {
      queue.push(data)

      if (queue.length === 3) {
        yield messageDecode(Buffer.concat(queue))
        queue = []
      }
    }
  }

  async startReciving() {
    for await (const message of this.reciveMessage()) {
      const entry = this.queue[message.key]
      if (entry === undefined) {
        console.error({
          who: "[ReverseProxyTarget]",
          message: "Can not find handler",
          key: message.key,
        })
      }

      if (message.isEnd) {
        delete this.queue[message.key]
        entry.handler(Buffer.concat([...entry.parts, message.body]))
      } else {
        entry.parts.push(message.body)
      }
    }
  }

  send(data: Buffer, handler: DataHandler): Promise<void> {
    return new Promise((resolve, reject) => {
      const keyText = randomHexString(16)
      const key = new TextEncoder().encode(keyText)

      this.queue[keyText] = {
        parts: [],
        handler: (data) => {
          try {
            handler(data)
            resolve()
          } catch (error) {
            reject(error)
          }
        },
      }

      this.socket.write(
        messageEncode({
          isEnd: true,
          key: keyText,
          body: data,
        }),
      )
    })
  }
}
