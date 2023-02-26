import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Socket } from "node:net"
import type { Json } from "../utils/Json"

export class ReverseProxyWaiter {
  constructor(public socket: Socket) {}

  async sendRequest(
    request: Http.IncomingMessage,
  ): Promise<Json | Buffer | void> {
    //
  }
}
