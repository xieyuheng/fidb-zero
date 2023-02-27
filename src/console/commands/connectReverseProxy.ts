type Options = {
  reverseProxy: {
    server: string
    username: string
    password: string
  }
  target: {
    hostname: string
    port: string | number
  }
}

export async function connectReverseProxy(options: Options): Promise<void> {
  //
}
