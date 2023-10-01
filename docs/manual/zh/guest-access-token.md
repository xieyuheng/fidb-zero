---
title: 访客访问令牌
---

我们用 `.guest-token-issuer/index.json` 这个数据文件来配置默认的访客访问令牌。

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

默认的访客访问令牌保存在 `.tokens/guest/index.json` 这个数据文件中：

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
