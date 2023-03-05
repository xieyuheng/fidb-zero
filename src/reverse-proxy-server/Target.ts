import type { Socket } from "node:net"

/**

   The `Target` multiplex one socket
   by have a record of handlers,
   one for each request.

**/

type Handler = {
  ondata: (data: Uint8Array) => void
  onerror: (error: Error) => void
  parts: Array<Uint8Array>
}

export type Target = {
  socket: Socket
  handlers: Record<string, Handler>
}

export function createTarget(socket: Socket): Target {
  return {
    socket,
    handlers: {},
  }
}
