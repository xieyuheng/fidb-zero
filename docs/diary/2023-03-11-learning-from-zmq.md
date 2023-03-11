---
title: Learning from ZMQ
author: Xie Yuheng
date: 2023-03-11
---

Currently our `channelServer` is like the `broker.backend` or ZMQ's majordemo.

`worker.dealer` and `broker.backend` message format:

```
worker.dealer.send:
| ["Ready", serviceName]
| ["Data", requestId, data]
| ["End", requestId]
worker.dealer.receive:
| ["Request", requestId, request]

broker.backend.receive:
| [workerId, "Ready", serviceName]
| [workerId, "Data", requestId, data]
| [workerId, "End", requestId]
broker.backend.send:
| [workerId, "Request", requestId, request]
```
