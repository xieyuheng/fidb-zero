import { decrypt } from "../utils/decrypt"
import { log } from "../utils/log"
import type { Broker } from "./Broker"
import { brokerPrepareWorker } from "./brokerPrepareWorker"

export async function brokerHandleMessage(
  broker: Broker,
  message: Array<Buffer>,
) {
  const who = "brokerHandleMessage"

  const [workerId, kind, ...rest] = message

  switch (String(kind)) {
    case "Ready": {
      const [serviceName] = rest

      brokerPrepareWorker(broker, String(serviceName), workerId)
      return
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

      requestSocket.write(await decrypt(data, service.encryptionKey))
      return
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
      return
    }

    default: {
      log({ who, message: `unknown kind: ${String(kind)}` })
      return
    }
  }
}
