import type { Broker } from "./Broker"
import { brokerPrepareWorker } from "./brokerPrepareWorker"

export async function brokerListenBackend(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
        const [serviceName] = rest

        brokerPrepareWorker(broker, String(serviceName), workerId)
      }

      case "Reply": {
        const [serviceName, requestId, reply] = rest

        brokerPrepareWorker(broker, String(serviceName), workerId)

        const service = broker.services.get(String(serviceName))
        if (service === undefined) {
          return
        }

        const requestSocket = service.requestSockets.get(String(requestId))
        if (requestSocket === undefined) {
          return
        }

        requestSocket.write(reply)
      }
    }
  }
}
