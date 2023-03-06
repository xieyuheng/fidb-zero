import type { Socket } from "node:net"
import { socketMultiDataStream } from "../multibuffer/socketMultiDataStream"
import { messageDecrypt } from "./messageDecrypt"

export async function* socketMessageStream(
  socket: Socket,
  encryptionKey: Uint8Array,
) {
  for await (const parts of socketMultiDataStream(socket, 3)) {
    yield await messageDecrypt(Buffer.concat(parts), encryptionKey)
  }
}
