---
title: kind=password-register
---

## POST {data-file}?kind=password-login

Register a user by password, to prepare a user for future logins.

For example:

```
POST users/xieyuheng?kind=password-register

{
  "password": "123456",
  "data": {
    "username": "xieyuheng",
    "name": "Xie Yuheng"
  }
}
```

Upon success, the following data files will be created:

```
users/xieyuheng/index.json
users/xieyuheng/.token-issuer/index.json
users/xieyuheng/.password/index.json
```

We use [brcryt](https://en.wikipedia.org/wiki/Bcrypt) to save password safely,
thus the password data file might be:

```
{
  "hash": "$2b$10$HpzyzH0jUr/h5H27Z9F4mew9ijI6cbPldhH9OYJOXqXK.O.qxuKfW",
  "memo": "My favorite password.",
  "@path": "users/xieyuheng/.password",
  "@revision": "ae937631eeec83a8edd2cbd381763274",
  "@createdAt": 1681389842021,
  "@updatedAt": 1681389842021
}
```

Upon register, we prepare a user for future logins by
creating a `.token-issuer` data file for that user.
For example, registering `users/xieyuheng`
will create `users/xieyuheng/.token-issuer`.

## .password-register-strategy

We use `.password-register-strategy` data file,
to configure which directory is allow to be login target,
and what `permissions` should be granted when creating `.token-issuer`.

For example, to allow all users be login target:

- Note that, pattern matching is needed in the path pattern.

```
{
  "loginTargets": {
    "users/{user}": {
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
        "users/*/public/**": [
          "data:get",
          "data-find:get",
          "file:get",
          "file-metadata:get",
          "directory:get"
        ]
      }
    }
  }
}
```
