---
title: 访客访问令牌
---

我们用 `.guest-token-issuer/index.json` 这个数据文件来配置默认的访客访问令牌。

```
{
  "groups": ["guest"],
  "@path": ".guest-token-issuer",
  "@revision": "8aa3b11fc0381b986555362cff8dc76e",
  "@createdAt": 1696150826106,
  "@updatedAt": 1696150826106
}
```

默认的访客访问令牌保存在 `.tokens/guest/index.json` 这个数据文件中：

```
{
  "issuer": ".guest-token-issuer",
  "issuerRevision": 1696150826106,
  "@path": ".tokens/guest",
  "@revision": "a1bcadd1573703e7fe69c61718d22e7d",
  "@createdAt": 1696150826107,
  "@updatedAt": 1696150826107
}
```
