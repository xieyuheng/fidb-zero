---
title: 访问控制
---

现在，我们已经有了一套可以操作 FiDB 的 HTTP API，
但是并不是每个人应该有权限做任何操作的，
我们需要控制 **谁** 能够做 **什么**。

访问控制相关的故事，只有和注册与登录一起讲才算完整。

- 访问控制（Access Control），在于用访问令牌来声明访问者是谁，
  每个 HTTP 请求都会带有这个访问令牌，
  服务器知道每个令牌所对应的权限。

- 登录（Login），在于给用户发放访问令牌。
  比如密码登陆，在于把令牌发放给提供了正确密码的用户。

- 注册（Register），在与创建用户并且为之后的登录做准备，
  比如用户名和密码的注册，在于创建用户并且为用户设置好密码，以便之后用密码登录。

实现注册与登录的方式多种多样，
比如用密码、用邮箱、用手机短信、
用第三方 OAuth API 等等等等。
首先我们来解决用密码注册和登录的问题，
因为这种方式是不依赖其他服务的，
因此也是最容易理解的。

## 使用访问令牌

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

## .default-token-issuer

我们用 `.default-token-issuer` 这个数据文件来配置默认的访问令牌的限。

假设我们想要让没有令牌的访客，
可以读取到所有用户的公开数据，
那么权限可以设置为：

```
{
  "groups": [ "guest" ]
}
```

TODO `.groups/guest`

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

默认的访问令牌应该给以 `default` 的名字，
并且保存在 `.tokens/default` 这个数据文件中：

```
{
  "issuer": ".default-token-issuer"
}
```
