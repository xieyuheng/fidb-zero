import type { Buffer } from "node:buffer"
import type { Socket } from "node:net"

export function socketData(socket: Socket): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    socket.on("data", (data: Buffer) => {
      resolve(data)
    })

    socket.on("error", (error) => {
      reject(error)
    })
  })
}
