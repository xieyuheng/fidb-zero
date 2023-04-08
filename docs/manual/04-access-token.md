---
title: Access Token
---

We already have HTTP API to do operations on fidb.
But not everyone can do all the operations,
we need to control who can do what.

The story of access control to a database
is only complete with the the story of register and login.
Here is how I understand them:

- Access control or authorization is about
  sending a access token together with a request,
  and the token maps to a list of permitted operations.

- Login is about issue access token to a user.

  Specially password login is about issue access token to a user
  who can provide the right password.

- Register is about preparing a user for later login.

  Specially password register is about setup the password of a user.

TODO
