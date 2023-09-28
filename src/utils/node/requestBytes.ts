import { Buffer } from "node:buffer"
import Http from "node:http"

export function requestBytes(
  request: Http.IncomingMessage,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const chunks: Array<Uint8Array> = []

    request.on("data", (chunk) => {
      chunks.push(chunk)
    })

    request.on("end", () => {
      resolve(Buffer.concat(chunks))
    })

    request.on("error", (error) => {
      reject(error)
    })
  })
}
