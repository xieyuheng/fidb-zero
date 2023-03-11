import type { Broker } from "./Broker"

export async function brokerListenBackend(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
        const [serviceName] = rest
        // brokerPrepareWorker(broker, String(serviceName), workerId)
      }

      case "Reply": {
        const [serviceName, requestId, reply] = rest
        // brokerPrepareWorker(broker, String(serviceName), workerId)
        // await broker.frontend.send([requestId, "Reply", serviceName, ...reply])
      }
    }
  }
}
