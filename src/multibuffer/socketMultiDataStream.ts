import type { Socket } from "node:net"
import { socketDataStream } from "./socketDataStream"

export async function* socketMultiDataStream(socket: Socket, length: number) {
  let parts: Array<Uint8Array> = []
  for await (const data of socketDataStream(socket)) {
    parts.push(data)

    if (parts.length === length) {
      yield parts
      parts = []
    }
  }
}
