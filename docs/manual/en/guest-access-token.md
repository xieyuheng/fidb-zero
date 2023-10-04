---
title: Guest Access Token
---

We use `.guest-token-issuer/index.json` data file
to config the permissions of the guest access token.

```
{
  "groups": [
    "guest"
  ],
  "@path": ".guest-token-issuer",
  "@revision": "a6c25435c0ff2a0c669478601028efda",
  "@createdAt": 1696151055327,
  "@updatedAt": 1696151055327
}
```

The guest access token is stored in `.tokens/guest/index.json`:

```
{
  "issuer": ".guest-token-issuer",
  "issuerRevision": "a6c25435c0ff2a0c669478601028efda",
  "@path": ".tokens/guest",
  "@revision": "38311b8cacf04587bf0803c7fe244dad",
  "@createdAt": 1696151055328,
  "@updatedAt": 1696151055328
}
```
