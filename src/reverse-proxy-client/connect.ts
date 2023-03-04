import { Buffer } from "node:buffer"
import Net from "node:net"
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
    `${serverURL.protocol}//${serverURL.host}?kind=reverse-proxy-target`,
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
      message: `fail to post`,
      url: `${serverURL.protocol}//${serverURL.host}?kind=reverse-proxy-target`,
      who,
      status: {
        code: response.status,
        message: response.statusText,
      },
    })

    return false
  }

  const proxy = await response.json()

  log({ who, proxy })

  const proxySocket = Net.createConnection(proxy.port, serverURL.hostname)

  proxySocket.on("close", () => {
    log({ who, message: "proxySocket closed" })
  })

  proxySocket.on("data", (data) => {
    const keyBuffer = data.subarray(0, proxy.keySize)
    const messageBuffer = data.subarray(proxy.keySize)

    const targetSocket = Net.createConnection(
      target.port,
      target.hostname,
      () => {
        targetSocket.write(messageBuffer)
      },
    )

    targetSocket.on("close", () => {
      log({ who, message: "targetSocket closed" })
    })

    targetSocket.on("data", (data) => {
      proxySocket.write(Buffer.concat([keyBuffer, data]))
    })
  })

  return true
}
