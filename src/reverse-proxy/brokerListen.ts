import { decrypt } from "../utils/decrypt"
import type { Broker } from "./Broker"
import { brokerPrepareWorker } from "./brokerPrepareWorker"

export async function brokerListen(broker: Broker) {
  for await (const [workerId, kind, ...rest] of broker.backend) {
    switch (String(kind)) {
      case "Ready": {
        const [serviceName] = rest

        brokerPrepareWorker(broker, String(serviceName), workerId)
        continue
      }

      case "Data": {
        const [serviceName, requestId, data] = rest

        brokerPrepareWorker(broker, String(serviceName), workerId)

        const service = broker.services.get(String(serviceName))
        if (service === undefined) {
          continue
        }

        const requestSocket = service.requestSockets.get(String(requestId))
        if (requestSocket === undefined) {
          continue
        }

        requestSocket.write(await decrypt(data, service.encryptionKey))
        continue
      }

      case "End": {
        const [serviceName, requestId] = rest

        brokerPrepareWorker(broker, String(serviceName), workerId)

        const service = broker.services.get(String(serviceName))
        if (service === undefined) {
          continue
        }

        const requestSocket = service.requestSockets.get(String(requestId))
        if (requestSocket === undefined) {
          continue
        }

        requestSocket.end()

        service.requestSockets.delete(String(requestId))
        continue
      }

      default: {
        console.log(`unknown kind: ${String(kind)}`)
      }
    }
  }
}
