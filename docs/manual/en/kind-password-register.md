---
title: kind=password-register
---

- To **register** a user by password,
  `POST` the user's path
  with query parameter `kind=password-register`,
  the initial data of the user
  and register options.

  For example:

  ```
  POST users/xieyuheng?kind=password-register

  {
    "data": {
      "username": "xieyuheng",
      "name": "Xie Yuheng"
    },
    "options": {
      "memo": "My favorite password.",
      "password": "123456"
    }
  }
  ```

  Upon success, the following data files will be created:

  ```
  users/xieyuheng/index.json
  users/xieyuheng/.login-token-issuer/index.json
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

- **Problem 5.1:** How to configure which directory can be used as login target?

- **Solution 5.1:** We can use `.config/password-register-strategy` data file,
  to configure which directory is allow to be login target,
  and what `permissions` should be granted when creating `.login-token-issuer`.

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
