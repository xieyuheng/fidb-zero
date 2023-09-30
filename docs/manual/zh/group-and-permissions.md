---
title: 用户组与权限
---

## 用户组

我们在 `.groups` 中配置用户组，
每个用户组中记录这个用户组对不同路径下资源的权限。

```
.groups/owner
.groups/user
.groups/guest
```

`.groups/owner`：

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

`.groups/guest`：

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

Given a path and an operation, the path patterns of the permissions
will be matched one by one, for a matching path pattern,
we see if the operation is included in the array of operations,
if it is not included, we go on to try the next one,
the matching fails only when all entries of the permissions are failed.

For example, we want to have an admin token
that can do everything to every directories.
The permissions would be:

```
{
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
```

For another example, when a user is logged in,
we want to give him/her a token
that permits him/her to read and write his/hers own directory
but only to read all other users' `public` directories.

Let's just suppose the user is me, and my username is `xieyuheng`.
The permissions would be:

```
{
  "users/xieyuheng/**": [
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
  "users/*/public/**": [
    "data:get",
    "data-find:get",
    "file:get",
    "file-metadata:get",
    "directory:get"
  ]
}
```
