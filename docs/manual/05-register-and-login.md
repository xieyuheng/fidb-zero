---
title: Register and Login
---

There are many different ways to do register and login,
such as using password, via email,
via mobile phone text message,
via third party oauth API and so on.
First and foremost we would like to solve the problem of
password register and login,
becasue it is independent
thus the simplest to understand and implement.

# Password Register and Login

Any data directory that has a password can be used to do password login.

- any data directory that has a password can be used to do password login.
- upon a password login a token is generated and return in response.
- the permissions of login token can be configed.
- maybe use password-login-strategies.json to do the config.

  ```
  loginDirectories: { [pattern]: { permissions: .. } }
  ```
