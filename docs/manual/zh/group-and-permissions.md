---
title: 用户组与权限
---

## 用户组

我们在 `.groups` 中配置用户组，
每个用户组中记录这个用户组对不同路径下资源的权限。

```
.groups/owner
.groups/guest
.groups/user
```

## 权限

我们用 key-value 映射来记录权限，
其中 key 是路径的模式，
value 是一个数组，
其中的元素是用户所能实施的操作。

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

例如数据库的拥有者所在的用户组 `.groups/owner`，
可以对所有路径进行任何操作：

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

访客所在的用户组 `.groups/guest` 可以读取所有用户的公开数据：

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

一个注册并登陆了的用户，
可以读写自己的文件夹内所有的数据，
并且that permits him/her to read and write his/hers own directory
but only to read all other users' `public` directories.

Let's just suppose the user is me, and my username is `xieyuheng`.
The permissions would be:

`.groups/user`，其中 `{user}` 会在检查权限时，代入当前的用户名：

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
