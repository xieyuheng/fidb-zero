import Http from "node:http"
import Net from "node:net"

type Options = {
  server: string
  username: string
  password: string
  target: {
    host: string
    port: number
  }
}

export async function connectReverseProxy(options: Options): Promise<void> {
  const { server, username, password, target } = options

  const initialRequest = Http.request(`${server}?kind=reverse-proxy-target`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })

  initialRequest.write(JSON.stringify({ username, password }))

  initialRequest.on("connect", (_response, socket) => {
    socket.on("data", (data) => {
      const targetSocket = new Net.Socket()
      targetSocket.connect(target.port, target.host, () => {
        targetSocket.write(data)
        targetSocket.on("data", (data) => {
          socket.write(data)
        })
        targetSocket.on("end", () => {
          socket.end()
        })
      })
    })
  })
}
