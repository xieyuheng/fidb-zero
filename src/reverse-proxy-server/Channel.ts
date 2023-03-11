import type { Socket } from "node:net"

export type Channel = {
  socket: Socket
  encryptionKey: Uint8Array
  clientSockets: Record<string, Socket>
}

export function createChannel(
  socket: Socket,
  encryptionKey: Uint8Array,
): Channel {
  return {
    socket,
    encryptionKey,
    clientSockets: {},
  }
}
