import { Buffer } from "node:buffer"
import Net from "node:net"

type Options = {
  server: { url: string }
  target: { hostname: string; port: number }
  username: string
  password: string
}

export async function connectReverseProxy(options: Options): Promise<void> {
  const { server, username, password, target } = options

  const response = await fetch(`${server.url}?kind=reverse-proxy-target`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    console.error({
      who: "[connectReverseProxy]",
      status: {
        code: response.status,
        message: response.statusText,
      },
    })

    return
  }

  const proxy = await response.json()

  console.log({
    who: "[connectReverseProxy]",
    proxy,
  })

  const proxySocket = Net.createConnection(proxy.port, proxy.hostname)

  proxySocket.on("close", () => {
    console.log({
      who: "[connectReverseProxy]",
      message: "proxySocket closed",
    })
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
      console.log({
        who: "[connectReverseProxy]",
        message: "targetSocket closed",
      })
    })

    targetSocket.on("data", (data) => {
      proxySocket.write(Buffer.concat([keyBuffer, data]))
    })
  })
}
