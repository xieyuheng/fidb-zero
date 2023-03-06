import type { Socket } from "node:net"

/**

   This `Channel` multiplex one socket
   by have a record of handlers,
   one for each request.

**/

export type Handler = {
  ondata: (data: Uint8Array) => void
  onend: () => void
  onerror: (error: Error) => void
}

export type Channel = {
  socket: Socket
  handlers: Record<string, Handler>
}

export function createChannel(socket: Socket): Channel {
  return {
    socket,
    handlers: {},
  }
}
