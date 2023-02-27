import Http from "node:http"

type Options = {
  server: string
  username: string
  password: string
}

export async function connectReverseProxy(options: Options): Promise<void> {
  const { server, username, password } = options

  const request = Http.request(`${server}?kind=reverse-proxy-target`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })

  request.write(JSON.stringify({ username, password }))

  request.on("connect", (socket) => {
    socket.on("data", (data) => {
      //
    })
  })
}
