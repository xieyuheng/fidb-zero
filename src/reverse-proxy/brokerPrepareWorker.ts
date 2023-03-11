import type { Broker } from "./Broker"
import { createService } from "./Service"
import { serviceReactive } from "./serviceReactive"

export function brokerPrepareWorker(
  broker: Broker,
  serviceName: string,
  encryptionKey: Uint8Array,
  workerId: Buffer,
): void {
  const found = broker.services.get(serviceName)
  if (found === undefined) {
    const service = serviceReactive(
      broker,
      createService(serviceName, encryptionKey, {
        workerIds: [workerId],
      }),
    )

    broker.services.set(serviceName, service)
  } else {
    found.workerIds.push(workerId)
  }
}
