import Net from "node:net"
import { acceptConnection } from "./acceptConnection"
import type { Context } from "./Context"

export function createChannelServer(ctx: Context): Net.Server {
  const channelServer = Net.createServer()

  channelServer.on("connection", (socket) => {
    acceptConnection(ctx, socket)
  })

  return channelServer
}
