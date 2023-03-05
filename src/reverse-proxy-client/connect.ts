import { Socket } from "node:net"
import type { Message } from "../reverse-proxy/Message"
import { messageDecode } from "../reverse-proxy/messageDecode"
import { messageEncode } from "../reverse-proxy/messageEncode"
import { formatAuthorizationHeader } from "../utils/formatAuthorizationHeader"
import { log } from "../utils/log"
import { tokenGet } from "./tokenGet"

type Options = {
  url: URL
  target: { hostname: string; port: number }
}

function parseArgURL(url: URL): { serverURL: URL; subdomain: string } {
  const [subdomain, ...hostnameParts] = url.hostname.split(".")
  const hostname = hostnameParts.join(".")
  const serverURL = new URL(`${url.protocol}//${hostname}:${url.port}`)
  return { serverURL, subdomain }
}

export async function connect(options: Options): Promise<boolean> {
  const who = "reverse-proxy-client/connect"

  const { url, target } = options
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

  channelSocket.setNoDelay()

  channelSocket.on("close", () => {
    log({ who, message: "channelSocket closed" })
  })

  channelSocket.on("data", (data) => {
    const message = messageDecode(data)
    channelSocketHandleMessage(channelSocket, message, target)
  })

  return true
}

function channelSocketHandleMessage(
  channelSocket: Socket,
  message: Message,
  target: { hostname: string; port: number },
): void {
  const who = "channelSocketHandleData"

  const targetSocket = new Socket()

  targetSocket.connect(target.port, target.hostname, () => {
    targetSocket.write(message.body)
    log({
      who,
      message: `connected to target`,
      target,
      sentLength: message.body.length,
    })
  })

  targetSocket.on("data", (data) => {
    channelSocketSendMessage(channelSocket, {
      isEnd: false,
      key: message.key,
      body: data,
    })
  })

  targetSocket.on("end", () => {
    channelSocketSendMessage(channelSocket, {
      isEnd: true,
      key: message.key,
      body: new Uint8Array(),
    })
  })
}

function channelSocketSendMessage(channelSocket: Socket, message: Message) {
  const who = "channelSocketSendMessage"

  try {
    channelSocket.write(messageEncode(message))
    log({
      who,
      isEnd: message.isEnd,
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
