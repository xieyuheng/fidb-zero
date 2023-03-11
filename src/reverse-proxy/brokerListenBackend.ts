import type { Broker } from "./Broker"
import { brokerPrepareWorker } from "./brokerPrepareWorker"

export async function brokerListenBackend(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
        const [serviceName] = rest

        brokerPrepareWorker(broker, String(serviceName), workerId)
      }

      case "Data": {
        const [serviceName, requestId, data] = rest

        brokerPrepareWorker(broker, String(serviceName), workerId)

        const service = broker.services.get(String(serviceName))
        if (service === undefined) {
          return
        }

        const requestSocket = service.requestSockets.get(String(requestId))
        if (requestSocket === undefined) {
          return
        }

        requestSocket.write(data)
      }

      case "End": {
        const [serviceName, requestId] = rest

        brokerPrepareWorker(broker, String(serviceName), workerId)

        const service = broker.services.get(String(serviceName))
        if (service === undefined) {
          return
        }

        const requestSocket = service.requestSockets.get(String(requestId))
        if (requestSocket === undefined) {
          return
        }

        requestSocket.end()

        service.requestSockets.delete(String(requestId))
      }
    }
  }
}
