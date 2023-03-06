import type { Socket } from "node:net"
import { dataStreamFromSocket } from "../multibuffer/dataStreamFromSocket"
import { streamGroup } from "../multibuffer/dataStreamGroup"
import { messageDecrypt } from "./messageDecrypt"

export async function* socketMessageStream(
  socket: Socket,
  encryptionKey: Uint8Array,
) {
  for await (const parts of streamGroup(dataStreamFromSocket(socket), 3)) {
    yield await messageDecrypt(Buffer.concat(parts), encryptionKey)
  }
}
