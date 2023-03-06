import { socketMultiDataStream } from "../multibuffer/socketMultiDataStream"
import type { Channel } from "./Channel"
import { messageDecrypt } from "./messageDecrypt"

export async function* channelMessageStream(channel: Channel) {
  for await (const parts of socketMultiDataStream(channel.socket, 3)) {
    yield await messageDecrypt(Buffer.concat(parts), channel.encryptionKey)
  }
}
