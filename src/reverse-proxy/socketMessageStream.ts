import type { Socket } from "node:net"
import { dataStreamFromSocket } from "../multibuffer/dataStreamFromSocket"
import { dataStreamGroup } from "../multibuffer/dataStreamGroup"
import { messageDecrypt } from "./messageDecrypt"

export async function* socketMessageStream(
  socket: Socket,
  encryptionKey: Uint8Array,
) {
  for await (const parts of dataStreamGroup(dataStreamFromSocket(socket), 3)) {
    yield await messageDecrypt(Buffer.concat(parts), encryptionKey)
  }
}
