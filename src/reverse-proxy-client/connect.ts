import { Socket } from "node:net"
import type { Message } from "../reverse-proxy/Message"
import { messageEncrypt } from "../reverse-proxy/messageEncrypt"
import { socketMessageStream } from "../reverse-proxy/socketMessageStream"
import { formatAuthorizationHeader } from "../utils/formatAuthorizationHeader"
import { log } from "../utils/log"
import { tokenGet } from "./tokenGet"

type Options = {
  url: URL
  local: { hostname: string; port: number }
}

function parseArgURL(url: URL): { serverURL: URL; subdomain: string } {
  const [subdomain, ...hostnameParts] = url.hostname.split(".")
  const hostname = hostnameParts.join(".")
  const serverURL = new URL(`${url.protocol}//${hostname}:${url.port}`)
  return { serverURL, subdomain }
}

export async function connect(options: Options): Promise<boolean> {
  const who = "reverse-proxy-client/connect"

  const { url, local } = options
  const { serverURL, subdomain } = parseArgURL(url)

  const value = await tokenGet(url.href)

  if (value === undefined) {
    log({
      knid: "Error",
      who,
      message: `not token for url`,
      url,
    })

    return false
  }

  const response = await fetch(
    `${serverURL.protocol}//${serverURL.host}?kind=channel`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: formatAuthorizationHeader(value.token),
      },
      body: JSON.stringify({
        subdomain,
        username: value.username,
      }),
    },
  )

  if (!response.ok) {
    log({
      knid: "Error",
      message: `fail to create channel`,
      host: serverURL.host,
      who,
      status: {
        code: response.status,
        message: response.statusText,
      },
    })

    return false
  }

  const channelInfo = await response.json()

  log({ who, channelInfo })

  const channelSocket = new Socket()

  channelSocket.connect(channelInfo.port, serverURL.hostname)

  log({ who, message: "connected to the channelSocket", channelInfo })

  channelSocket.setNoDelay()

  channelSocket.on("close", () => {
    log({ who, message: "channelSocket closed" })
  })

  const encryptionKey = Buffer.from(channelInfo.encryptionKeyText, "hex")

  channelSocketStart(channelSocket, encryptionKey, local)

  return true
}

async function channelSocketStart(
  channelSocket: Socket,
  encryptionKey: Uint8Array,
  local: { hostname: string; port: number },
): Promise<void> {
  const who = "channelSocketStart"

  for await (const message of socketMessageStream(
    channelSocket,
    encryptionKey,
  )) {
    if (message.kind === "Request") {
      channelSocketHandleMessage(channelSocket, encryptionKey, message, local)
    } else {
      log({
        who,
        kind: "Error",
        message: "unknown message kind",
        messageKind: message.kind,
      })
    }
  }
}

function channelSocketHandleMessage(
  channelSocket: Socket,
  encryptionKey: Uint8Array,
  message: Message,
  local: { hostname: string; port: number },
): void {
  const who = "channelSocketHandleMessage"

  const localSocket = new Socket()

  localSocket.connect(local.port, local.hostname, () => {
    log({
      who,
      message: "localSocket connected",
      local,
    })

    localSocket.write(message.body)

    log({
      who,
      message: "data sent to localSocket",
      sent: {
        length: message.body.length,
      },
    })
  })

  localSocket.on("data", (data) => {
    channelSocketSendMessage(channelSocket, encryptionKey, {
      kind: "Data",
      key: message.key,
      body: data,
    })
  })

  localSocket.on("end", () => {
    channelSocketSendMessage(channelSocket, encryptionKey, {
      kind: "End",
      key: message.key,
      body: new Uint8Array(),
    })
  })

  localSocket.on("close", () => {
    log({
      who,
      message: "localSocket closed",
      local,
    })
  })
}

async function channelSocketSendMessage(
  channelSocket: Socket,
  encryptionKey: Uint8Array,
  message: Message,
): Promise<void> {
  const who = "channelSocketSendMessage"

  try {
    channelSocket.write(await messageEncrypt(message, encryptionKey))
    log({
      who,
      kind: message.kind,
      key: new TextDecoder().decode(message.key),
    })
  } catch (error) {
    log({
      who,
      kind: "Error",
      message: (error as Error).message,
    })
  }
}
