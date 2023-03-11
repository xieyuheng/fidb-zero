import * as Zmq from "zeromq"
import { brokerListenBackend } from "./brokerListenBackend"
import type { Service } from "./Service"

export type Broker = {
  backend: Zmq.Router
  services: Map<string, Service>
}

export function createBroker(): Broker {
  const broker = {
    backend: new Zmq.Router({ sendHighWaterMark: 1 }),
    services: new Map(),
  }

  brokerListenBackend(broker)

  // for (const eventType of eventTypes()) {
  //   broker.backend.events.on(eventType, (event) => {
  //     console.log({ who: "broker", event })
  //   })
  // }

  return broker
}
