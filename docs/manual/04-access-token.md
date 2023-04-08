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

- **Problem 4.1:** How should we map a token to permissions?

- **Solution 4.1:** We tokens as data, in a preserved data table
  (a directory) -- `tokens/`.

  For example:

  ```
  tokens/cc224145f46a393f8ca71c4eb62aafe1/index.json
  tokens/5d551a1ca96496acd2c68eefcd294e88/index.json
  ...
  ```

  Where each token as a `permissions` property.

- **Problem 4.2:** How should we represent permissions?

- **Solution 4.3:** We use a record (a JSON object) to represent permissions,
  where the key is a path pattern, and the value is an array of operations.

  For example:

  ```
  {
    "**": []
  }
  ```

  TODO

- **Problem 4.3:** How should a user use token?

- **Solution 4.3:** When sending a HTTP request,
  a user (a client) should add the token to
  the [`Authorization` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization).

  The syntax of this header is:

  ```
  Authorization: <auth-scheme> <authorization-parameters>
  ```

  In our case, the `<auth-scheme>` should be `token`,
  and the `<authorization-parameters>` should be the value of the token.

  For example:

  ```
  Authorization: token cc224145f46a393f8ca71c4eb62aafe1
  ```

  If no token is sent, a default token
  with default permissions will be used.

TODO
