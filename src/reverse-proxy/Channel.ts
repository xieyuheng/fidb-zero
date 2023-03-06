import type { Socket } from "node:net"

/**

   This `Channel` multiplex one socket
   by have a record of handlers,
   one for each request.

**/

export type Channel = {
  socket: Socket
  clientSockets: Record<string, Socket>
}

export function createChannel(socket: Socket): Channel {
  return {
    socket,
    clientSockets: {},
  }
}
