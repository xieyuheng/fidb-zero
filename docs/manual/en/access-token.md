---
title: Access Token
---

When sending a HTTP request,
a user should add the access token to
the [Authorization HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization).

The syntax of this header is:

```
Authorization: <auth-scheme> <authorization-parameters>
```

In our case, the `<auth-scheme>` should be `token`,
and the `<authorization-parameters>` should be the value of the token.

For example:

```
Authorization: token cc224145f46a393f8ca71c4eb62aafe1
```

If no token is sent, a default token
with default permissions will be used.
