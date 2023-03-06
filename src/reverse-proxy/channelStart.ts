import type { Channel } from "./Channel"
import { channelHandleMessage } from "./channelHandleMessage"
import { channelMessageStream } from "./channelMessageStream"

export async function channelStart(
  channel: Channel,
  encryptionKey: Uint8Array,
): Promise<void> {
  for await (const message of channelMessageStream(channel)) {
    channelHandleMessage(channel, message)
  }
}
