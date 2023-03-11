import * as Zmq from "zeromq"

export type Worker = {
  dealer: Zmq.Dealer
}

export function createWorker(): Worker {
  return {
    dealer: new Zmq.Dealer(),
  }
}
