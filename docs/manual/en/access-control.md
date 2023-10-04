---
title: Access Control
---

We already have HTTP API to do operations on FiDB,
but not everyone should be allowed to do every operations right?
We need to control _who_ can do _what_.

The story of access control to a database
is only complete with the the story of register and login.
Here is how I understand them:

- Access control is about
  using an access token to declare "I am authorized",
  while the token maps to a list of permitted operations.

- Login is about issuing access token to a user.
  Specially, password login is about issuing access token to a user
  who have provided the right password.

- Register is about preparing a user for future logins.
  Specially, password register is about setting up the password for a user.

There are many different ways to do register and login,
such as using password, via email,
via mobile phone text message,
via third party OAuth API and so on.
First and foremost we would like to solve the problem of
password register and login,
becasue it does not dependent on other services,
thus the simplest to understand and implement.
