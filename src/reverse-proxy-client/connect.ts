import { Socket } from "node:net"
import { multibufferEncode } from "../multibuffer"
import { lengthPrefixedDataStreamFromSocket } from "../multibuffer/lengthPrefixedDataStreamFromSocket"
import { streamGroup } from "../multibuffer/streamGroup"
import { streamMap } from "../multibuffer/streamMap"
import type { Message } from "../reverse-proxy/Message"
import { messageDecrypt } from "../reverse-proxy/messageDecrypt"
import { messageEncrypt } from "../reverse-proxy/messageEncrypt"
import { formatAuthorizationHeader } from "../utils/formatAuthorizationHeader"
import { log } from "../utils/log"
import { tokenGet } from "./tokenGet"

type Options = {
  publicURL: URL
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

  const { publicURL, local } = options
  const { serverURL, subdomain } = parseArgURL(publicURL)

  const value = await tokenGet(publicURL.href)

  if (value === undefined) {
    log({
      knid: "Error",
      who,
      message: `not token for url`,
      url: publicURL,
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

  const channelTicket = await response.json()

  log({ who, channelTicket })

  const channelSocket = new Socket()

  channelSocket.connect(channelTicket.channelServerPort, serverURL.hostname)

  log({ who, message: "connected to the channelSocket" })

  channelSocket.setNoDelay()

  channelSocket.on("close", () => {
    log({ who, message: "channelSocket closed" })
  })

  const encryptionKey = Buffer.from(channelTicket.encryptionKeyText, "hex")

  const firstData = new TextEncoder().encode(channelTicket.localServerId)

  channelSocket.write(multibufferEncode([firstData]))

  channelSocketListen(channelSocket, encryptionKey, local)

  return true
}

async function channelSocketListen(
  channelSocket: Socket,
  encryptionKey: Uint8Array,
  local: { hostname: string; port: number },
): Promise<void> {
  const who = "channelSocketListen"

  const messageStream = streamMap(
    streamGroup(lengthPrefixedDataStreamFromSocket(channelSocket), 3),
    (parts) => messageDecrypt(Buffer.concat(parts), encryptionKey),
  )

  for await (const message of messageStream) {
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
