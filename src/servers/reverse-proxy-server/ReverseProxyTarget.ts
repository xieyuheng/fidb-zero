import { Buffer } from "node:buffer"
import type { Socket } from "node:net"
import { randomHexString } from "../../utils/node/randomHexString"

type DataHandler = (data: Buffer) => void

export const keySize = 20

export class ReverseProxyTarget {
  private handlers: Record<string, DataHandler> = {}

  constructor(public socket: Socket) {
    socket.on("data", (data) => {
      // NOTE A target http server must sent
      // the whole response in one `socket.write()`.

      const keyBuffer = data.subarray(0, keySize)
      const keyText = keyBuffer.toString()

      const handler = this.handlers[keyText]
      if (handler !== undefined) {
        delete this.handlers[keyText]
        const messageBuffer = data.subarray(keySize)
        handler(messageBuffer)
      } else {
        console.error({
          who: "[ReverseProxyTarget]",
          message: "Can not find handler",
          key: keyText,
        })
      }
    })
  }

  send(messageBuffer: Buffer, handler: DataHandler): Promise<void> {
    return new Promise((resolve, reject) => {
      const keyText = randomHexString(keySize / 2)
      const keyBuffer = new TextEncoder().encode(keyText)

      this.handlers[keyText] = (data) => {
        try {
          handler(data)
          resolve()
        } catch (error) {
          reject(error)
        }
      }

      this.socket.write(Buffer.concat([keyBuffer, messageBuffer]))
    })
  }
}
