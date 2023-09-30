---
title: 访问令牌
---

当发送 HTTP 请求的时候，
客户端会把访问令牌（Access Token）加到
[Authorization HTTP 头字段](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) 中。

这个头字段的语法如下：

```
Authorization: <auth-scheme> <authorization-parameters>
```

对我们的服务器而言，`<auth-scheme>` 应该写为 `token`，
而 `<authorization-parameters>` 是访问令牌。

例如：

```
Authorization: token cc224145f46a393f8ca71c4eb62aafe1
```

如果发送 HTTP 请求时没有提供访问令牌，
服务器将会使用一个默认的访问令牌。
