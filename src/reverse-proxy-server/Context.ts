import { resolve } from "node:path"
import { createDatabase, Database } from "../database"
import type { Channel } from "./Channel"
import type { ChannelInfo } from "./handleChannel"

export type Context = {
  db: Database
  domain: string
  availablePorts: Array<number>
  channelServerPort: number
  channels: Record<string, Channel>
  channelInfos: Record<string, ChannelInfo>
}

type ContextOptions = {
  path: string
  domain: string
  availablePorts: Array<number>
  channelServerPort: number
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path, domain, availablePorts, channelServerPort } = options

  const db = await createDatabase({ path: resolve(path) })

  return {
    db,
    domain,
    availablePorts,
    channelServerPort,
    channels: {},
    channelInfos: {},
  }
}
