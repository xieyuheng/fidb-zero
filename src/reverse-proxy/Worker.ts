import * as Zmq from "zeromq"

export type Worker = {
  dealer: Zmq.Dealer
}

export function createWorker(): Worker {
  const dealer = new Zmq.Dealer()

  dealer.connect

  return {
    dealer,
  }
}
