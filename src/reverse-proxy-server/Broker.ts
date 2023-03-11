import type { Socket } from "node:net"
import type * as Zmq from "zeromq"

export type Broker = {
  backend: Zmq.Router
  encryptionKey: Uint8Array
  clientSockets: Record<string, Socket>
}
