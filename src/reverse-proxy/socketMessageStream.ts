import type { Socket } from "node:net"
import { dataStreamGroup } from "../multibuffer/dataStreamGroup"
import { socketDataStream } from "../multibuffer/socketDataStream"
import { messageDecrypt } from "./messageDecrypt"

export async function* socketMessageStream(
  socket: Socket,
  encryptionKey: Uint8Array,
) {
  for await (const parts of dataStreamGroup(socketDataStream(socket), 3)) {
    yield await messageDecrypt(Buffer.concat(parts), encryptionKey)
  }
}
