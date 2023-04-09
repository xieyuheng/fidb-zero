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

- **Problem:** How to do password register?

- **Solution:** TODO

- **Problem:** How to configure which directory can be used as login target?

- **Solution:** We can use `password-register-strategy.json` file,
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

- **Problem:** How to do password login?

- **Solution:** Any data directory that has a password
  can be used to do password login.

  TODO
