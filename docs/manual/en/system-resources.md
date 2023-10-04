---
title: System Resources
---

Paths like `.guest-token-issuer` and`.tokens/guest`,
where part of it starts with `.`,
are viewed as system resources.

We make the convention that requests to normal resources,
like `kind=data` and `kind=file`,
can not access system data files.
