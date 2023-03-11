import * as Zmq from "zeromq"
import { workerListen } from "./workerListen"

export type Worker = {
  dealer: Zmq.Dealer
  encryptionKey: Uint8Array
  local: { hostname: string; port: number }
}

export async function createWorker(options: {
  hostname: string
  subdomain: string
  local: { hostname: string; port: number }
  ticket: {
    channelServerPort: number
    encryptionKeyText: string
    workerId: string
  }
}): Promise<Worker> {
  const { hostname, subdomain, local, ticket } = options

  const dealer = new Zmq.Dealer()

  dealer.routingId = ticket.workerId
  dealer.connect(`tcp://${hostname}:${ticket.channelServerPort}`)

  const encryptionKey = Buffer.from(ticket.encryptionKeyText, "hex")

  const worker = { dealer, encryptionKey, local }

  await dealer.send(["Ready", subdomain])

  workerListen(worker)

  return worker
}
