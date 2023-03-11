import * as Zmq from "zeromq"

export type Worker = {
  dealer: Zmq.Dealer
}

export function createWorker(options: {
  hostname: string
  local: { hostname: string; port: number }
  ticket: {
    channelServerPort: number
    encryptionKeyText: string
    localServerId: string
  }
}): Worker {
  const dealer = new Zmq.Dealer()

  dealer.connect

  return {
    dealer,
  }
}
