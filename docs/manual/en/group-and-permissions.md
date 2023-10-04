---
title: Group and Permissions
---

## Group

We config user groups in `.groups`.

For examples:

```
.groups/guest
.groups/owner
.groups/user
```

Each group record it's permissions to different paths.

## Permissions

We use a key-value map to record permissions.

- The key is a path pattern.
- The value is an array of operations.

An operation consists of the kind of resource and the HTTP method name:

```
<resource-kind>:<http-method>
```

For examples:

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

We use [`micromatch`](https://github.com/micromatch/micromatch)
to match path patterns.

Given a path and an operation,
the path patterns in the permissions
will be used one by one to match the path.
For the first matching result,
see if the given operation is in the operation list.
If no, the whole matching fails.
Only first matching path pattern matters,
we will not match the next path pattern.

The group for guests `.groups/guest` can:

- List users.
- Read a user's basic information.
- Read a user's public data.

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

The group for the owner of the database `.groups/owner` can:

- Do everything to everything path.

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

The group for logged in user `.groups/user` can:

- Read and write his/her own data.
- Do all the thing a guest can do.

Note that, the following `{user}` will be replaced by
current username during permission checking.

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
