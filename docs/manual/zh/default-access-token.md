---
title: 默认访问令牌
---

我们用 `.default-token-issuer` 这个数据文件来配置默认访问令牌。

假设我们想要让没有令牌的访客，
可以读取到所有用户的公开数据，
那么权限可以设置为：

```
{
  "groups": [ "guest" ]
}
```

默认的访问令牌应该给以 `default` 的名字，
并且保存在 `.tokens/default` 这个数据文件中：

```
{
  "issuer": ".default-token-issuer"
}
```
