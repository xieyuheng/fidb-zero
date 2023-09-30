---
title: kind=password-login
---

## POST users/{user}?kind=password-login

通过用户名和密码登录一个用户。

例如：

```
POST users/xieyuheng?kind=password-login

{
  "password": "123456"
}
```

成功时返回令牌：

```
{
  "token": "cc224145f46a393f8ca71c4eb62aafe1"
}
```

并且将新的令牌保存在 `.tokens` 目录下：

```
.tokens/cc224145f46a393f8ca71c4eb62aafe1/index.json
```

每个令牌有一个 `issuer` 属性，记录是谁发行的令牌。

```
{
  "issuer": "users/xieyuheng/.token-issuer",
  "@path": ".tokens/cc224145f46a393f8ca71c4eb62aafe1",
  ...
}
```

收到带着令牌的 HTTP 请求时，服务器会依照 `issuer` 中的记录，
找到所对应的用户名和用户所属的用户组。

令牌中并不保存这些信息，
这样当我们想要修改某一用户所属的用户组时，
只要修改这个用户的 `.token-issuer` 中的数据就好了。
