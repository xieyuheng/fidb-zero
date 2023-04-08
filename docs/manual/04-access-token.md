---
title: Access Token
---

We already have HTTP API to do operations on fidb,
but not everyone should be able to do every operations right?
We need to control who can do what.

The story of access control to a database
is only complete with the the story of register and login.
Here is how I understand them:

- Access control is about
  using an access token to declare "I am authorized",
  while the token maps to a list of permitted operations.

- Login is about issuing access token to a user.

  Specially, password login is about issuing access token to a user
  who can provide the right password.

- Register is about preparing a user for later login.

  Specially, password register is about setting up the password for a user.

TODO
