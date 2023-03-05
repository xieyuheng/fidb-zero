import type { Socket } from "node:net"

/**

   The `Channel` multiplex one socket
   by have a record of handlers,
   one for each request.

**/

type Handler = {
  ondata: (data: Uint8Array) => void
  onerror: (error: Error) => void
  parts: Array<Uint8Array>
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
