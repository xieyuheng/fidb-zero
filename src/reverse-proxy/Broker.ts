import * as Zmq from "zeromq"
import type { Service } from "./Service"

export type Broker = {
  backend: Zmq.Router
  services: Map<string, Service>
}

export function createBroker(): Broker {
  return {
    backend: new Zmq.Router({ sendHighWaterMark: 1 }),
    services: new Map(),
  }
}
