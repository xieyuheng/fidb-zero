import type { Socket } from "node:net"
import { dataStreamFromSocket } from "../multibuffer/dataStreamFromSocket"
import { streamGroup } from "../multibuffer/streamGroup"
import { streamMap } from "../multibuffer/streamMap"
import { messageDecrypt } from "./messageDecrypt"

export async function* socketMessageStream(
  socket: Socket,
  encryptionKey: Uint8Array,
) {
  const stream = streamMap(
    streamGroup(dataStreamFromSocket(socket), 3),
    (parts) => messageDecrypt(Buffer.concat(parts), encryptionKey),
  )

  for await (const x of stream) {
    yield x
  }
}
