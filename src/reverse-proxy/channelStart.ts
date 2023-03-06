import type { Channel } from "./Channel"
import { channelReceiveMessage } from "./channelReceiveMessage"
import { socketMessageStream } from "./socketMessageStream"

export async function channelStart(
  channel: Channel,
  encryptionKey: Uint8Array,
): Promise<void> {
  for await (const message of socketMessageStream(
    channel.socket,
    channel.encryptionKey,
  )) {
    channelReceiveMessage(channel, message)
  }
}
