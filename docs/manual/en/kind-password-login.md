---
title: kind=password-login
---

There are many different ways to do register and login,
such as using password, via email,
via mobile phone text message,
via third party OAuth API and so on.
First and foremost we would like to solve the problem of
password register and login,
becasue it is independent
thus the simplest to understand and implement.

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
