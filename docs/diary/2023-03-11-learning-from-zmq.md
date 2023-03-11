---
title: Learning from ZMQ
author: Xie Yuheng
date: 2023-03-11
---

Currently our `channelServer` is like the `broker.backend` or ZMQ's majordemo.

`broker.backend` message format:

```
broker.backend.receive:
| [workerId, "Reply", requestId, body]
broker.backend.send:
| [workerId, "Request", requestId, body]
```
