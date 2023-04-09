---
title: Register and Login
---

There are many different ways to do register and login,
such as using password, via email,
via mobile phone text message,
via third party OAuth API and so on.
First and foremost we would like to solve the problem of
password register and login,
becasue it is independent
thus the simplest to understand and implement.

# Password Register and Login

- To **register** a user by password,
  `POST` the user's path
  with query parameter `kind=password-register`
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

  Upon success, the following files will be created:

  ```
  users/xieyuheng/index.json
  users/xieyuheng/.login/index.json
  ```

- **Problem:** How to configure which directory can be used as login target?

- **Solution:** We can use `.configs/password-register-strategy`,
  at the root of the database,
  to configure which directory is allow to be login target,
  and what `permissions` should be generated when creating new login target.

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

- To **login** a user by password,
  `POST` the user's path
  with query parameter `kind=password-login`
  and the `password` in the body.

  For example:

  ```
  POST users/xieyuheng?kind=password-login

  {
    "password": "123456"
  }
  ```

  Upon success, a token will be return in response as a JSON string.

  For example:

  ```
  "cc224145f46a393f8ca71c4eb62aafe1"
  ```
