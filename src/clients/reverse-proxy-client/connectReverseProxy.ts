import { Buffer } from "node:buffer"
import Net from "node:net"
import { log } from "../../utils/log"

type Options = {
  url: URL
  username: string
  password: string
  target: { hostname: string; port: number }
}

function parseArgURL(url: URL): { serverURL: URL; subdomain: string } {
  const [subdomain, ...hostnameParts] = url.hostname.split(".")
  const hostname = hostnameParts.join(".")
  const serverURL = new URL(`${url.protocol}//${hostname}:${url.port}`)
  return { serverURL, subdomain }
}

export async function connectReverseProxy(options: Options): Promise<void> {
  const who = "connectReverseProxy"

  const { url, username, password, target } = options
  const { serverURL, subdomain } = parseArgURL(url)

  const response = await fetch(
    `${serverURL.protocol}//${serverURL.host}?kind=reverse-proxy-target`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        subdomain,
        username,
        password,
      }),
    },
  )

  if (!response.ok) {
    log({
      knid: "Error",
      who,
      status: {
        code: response.status,
        message: response.statusText,
      },
    })

    return
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
}
