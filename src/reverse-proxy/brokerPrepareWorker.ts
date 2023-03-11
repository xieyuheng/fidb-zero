import type { Broker } from "./Broker"
import { createService } from "./Service"
import { serviceReactive } from "./serviceReactive"

export function brokerPrepareWorker(
  broker: Broker,
  serviceName: string,
  workerId: Buffer,
): void {
  const found = broker.services.get(serviceName)
  if (found === undefined) {
    const service = serviceReactive(
      broker,
      createService(serviceName, {
        workerIds: [workerId],
      }),
    )

    broker.services.set(serviceName, service)
  } else {
    found.workerIds.push(workerId)
  }
}
