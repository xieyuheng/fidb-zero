---
title: 用户组与权限
---

## 用户组

我们在 `.groups` 中配置用户组。

例如：

```
.groups/guest
.groups/owner
.groups/user
```

每个用户组中记录这个用户组对不同路径下资源的权限。

## 权限

我们用 key-value 映射来记录权限，其中：
- key 是路径的模式。
- value 是一个数组，其中的元素是用户所能实施的操作。

一个操作由资源类型与 HTTP 方法名字组成：

```
<resource-kind>:<http-method>
```

例如：

```
data:post
data:get
data:put
data:patch
data:delete
data-find:get
file:post
file:get
file:put
file:delete
file-metadata:get
directory:post
directory:get
directory:delete
```

我们用 [`micromatch`](https://github.com/micromatch/micromatch)
来处理路径模式的模式匹配。

给出某个路径与想要进行的操作，
将会用权限记录中的路径模式逐一匹配。
对于第一个匹配到的结果，
看想要进行的操作是否在其操作列表中。
如果不在，整个匹配失败，不会继续匹配下一个记录。

访客所在的用户组 `.groups/guest` 可以：

- 读用户列表。
- 读取用户的基本信息数据。
- 读取所有用户的公开数据。

```
{
  "permissions": {
    "users": ["directory:get"],
    "users/*": ["data:get"],
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

例如数据库的拥有者所在的用户组 `.groups/owner` 可以：

- 对所有路径进行任何操作。

```
{
  "permissions": {
    "**": [
      "data:post",
      "data:get",
      "data:put",
      "data:patch",
      "data:delete",
      "data-find:get",
      "file:post",
      "file:get",
      "file:put",
      "file:delete",
      "file-metadata:get",
      "directory:post",
      "directory:get",
      "directory:delete"
    ]
  }
}
```

一个注册并登陆了的用户所在的用户组 `.groups/user` 可以：

- 读写自己用户文件夹内的所有内容。
- 也拥有访客的所有权限。

注意，数据中的 `{user}` 会在检查权限时，代入当前的用户名。

```
{
  "permissions": {
    "users/{user}/**": [
      "data:post",
      "data:get",
      "data:put",
      "data:patch",
      "data:delete",
      "data-find:get",
      "file:post",
      "file:get",
      "file:put",
      "file:delete",
      "file-metadata:get",
      "directory:post",
      "directory:get",
      "directory:delete"
    ],
    "users": ["directory:get"],
    "users/*": ["data:get"],
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
