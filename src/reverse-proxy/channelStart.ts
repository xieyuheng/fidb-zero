import type { Channel } from "./Channel"
import { channelMessageStream } from "./channelMessageStream"
import { channelReceiveMessage } from "./channelReceiveMessage"

export async function channelStart(
  channel: Channel,
  encryptionKey: Uint8Array,
): Promise<void> {
  for await (const message of channelMessageStream(channel)) {
    channelReceiveMessage(channel, message)
  }
}
