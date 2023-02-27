import type { Buffer } from "node:buffer"
import type { Socket } from "node:net"

type HandleData = (data: Buffer) => void

export class ReverseProxyTarget {
  queue: Array<HandleData> = []

  constructor(public socket: Socket) {
    socket.on("data", (data) => {
      // NOTE A target http server must sent
      // the whole response in one `socket.write()`.
      const handleData = this.queue.shift()
      if (handleData !== undefined) {
        handleData(data)
      }
    })
  }

  send(message: Buffer | string, handleData: HandleData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.write(message)
      this.queue.push((data) => {
        try {
          handleData(data)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })
  }
}
