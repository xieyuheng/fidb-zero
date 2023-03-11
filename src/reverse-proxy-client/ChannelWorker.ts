import { Socket } from "node:net"
import { multibufferEncode } from "../multibuffer"
import { log } from "../utils/log"
import { channelWorkerListen } from "./channelWorkerListen"

export type ChannelWorker = {
  socket: Socket
  encryptionKey: Uint8Array
  local: { hostname: string; port: number }
}

export function createChannelWorker(options: {
  hostname: string
  local: { hostname: string; port: number }
  ticket: {
    channelServerPort: number
    encryptionKeyText: string
    workerId: string
  }
}): ChannelWorker {
  const who = "ChannelWorker"

  const { hostname, local, ticket } = options

  const encryptionKey = Buffer.from(ticket.encryptionKeyText, "hex")

  const socket = new Socket()

  socket.connect(ticket.channelServerPort, hostname)

  socket.setNoDelay()

  socket.on("close", () => {
    log({ who, message: "ChannelWorker socket closed" })
  })

  const firstData = new TextEncoder().encode(ticket.workerId)

  socket.write(multibufferEncode([firstData]))

  const worker = {
    socket,
    encryptionKey,
    local,
  }

  channelWorkerListen(worker)

  return worker
}
