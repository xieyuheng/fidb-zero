import type { Socket } from "node:net"
import type { ReverseProxyWaiter } from "./ReverseProxyWaiter"

export type ReverseProxyTarget = {
  socket: Socket
  waiter: ReverseProxyWaiter
}
