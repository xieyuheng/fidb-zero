import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import Net from "node:net"
import { requestToken } from "../database-server/requestToken"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { requestJsonObject } from "../server/requestJsonObject"
import { serverListen } from "../server/serverListen"
import { tokenAssert } from "../token"
import { generateEncryptionKey } from "../utils/generateEncryptionKey"
import type { Json } from "../utils/Json"
import { findPort } from "../utils/node/findPort"
import { randomHexString } from "../utils/randomHexString"
import { acceptConnection } from "./acceptConnection"
import type { Context } from "./Context"
import { SubdomainSchema } from "./SubdomainSchema"

export async function handleChannel(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleChannel"

  const token = await requestToken(ctx, request)

  if (request.method === "POST") {
    const schema = ty.object({
      subdomain: ty.string(),
      username: ty.string(),
    })

    const { subdomain, username } = schema.validate(
      await requestJsonObject(request),
    )

    tokenAssert(token, `users/${username}`, "read")

    await assertSubdomainUsable(ctx, subdomain, username)

    const channelServer = Net.createServer()

    channelServer.on("connection", (socket) => {
      acceptConnection(ctx, socket, encryptionKey, { username, subdomain })
    })

    const port = await findPort(10000)

    await serverListen(channelServer, { port })

    if (request.socket === null) {
      return
    }

    const localServerId = `${request.socket.remoteAddress}#${randomHexString(
      16,
    )}`

    const encryptionKey = await generateEncryptionKey()
    const encryptionKeyText = Buffer.from(encryptionKey).toString("hex")

    return {
      port,
      localServerId,
      encryptionKeyText,
    }
  }

  throw new Error(
    [`[${who}] unhandled http request`, `  method: ${request.method}`].join(
      "\n",
    ),
  )
}

export async function assertSubdomainUsable(
  ctx: Context,
  subdomain: string,
  username: string,
): Promise<void> {
  const who = "assertSubdomainUsable"

  const subdomainData = await Db.dataGet(ctx.db, `subdomains/${subdomain}`)
  if (subdomainData === undefined) {
    throw new Unauthorized(
      `[${who}] subdomain: ${subdomain} can not be used by username: ${username}`,
    )
  }

  const { usernames } = SubdomainSchema.validate(subdomainData)
  if (!usernames.includes(username)) {
    throw new Unauthorized(
      `[${who}] subdomain: ${subdomain} can not be used by username: ${username}`,
    )
  }
}
