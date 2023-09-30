---
title: 访客访问令牌
---

我们用 `.guest-token-issuer` 这个数据文件来配置默认的访客访问令牌。

```
{
  "groups": [ "guest" ]
}
```

默认的访客访问令牌保存在 `.tokens/guest` 这个数据文件中：

```
{
  "issuer": ".guest-token-issuer"
}
```
