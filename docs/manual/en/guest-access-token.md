---
title: Guest Access Token
---

We use `.guest-token-issuer` data file to config the default permissions,
which contains a `permissions` property
for the default permissions.

For example, suppose we want all guests
to be able to read all users public data:

```
{
  "permissions": {
    "users/*/public/**": [
      "data:get",
      "data-find:get",
      "file:get",
      "file-metadata:get",
      "directory:get"
    ]
  }
}
```

And we can use a token named `default` to point to the default issuer.

The token file should be:

```
.tokens/guest/index.json
```

The token data could be:

```
{
  "issuer": ".guest-token-issuer"
}
```
