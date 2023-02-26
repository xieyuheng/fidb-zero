import type { Socket } from "node:net"

export type ReverseProxyTarget = {
  socket: Socket
}
