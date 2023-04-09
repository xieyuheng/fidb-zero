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
  who has provided the right password.

- Register is about preparing a user for future logins.
  Specially, password register is about setting up the password for a user.

I want to implement the above by the following:

- **Problem 4.1:** How should we preparing a user for future logins?

- **Solution 4.1:** Upon register, we prepare a user for future logins by
  creating a (nested) subdirectory in `login-targets`.

  For example, register `users/xieyuheng`
  will prepare a subdirectory `login-targets/users/xieyuheng`.

  In a login target directory, we can store a `permissions.json` config file.

  The format of which will be discussed later.

- **Problem 4.2:** How should we issue token to a user?

- **Solution 4.2:** Upon login, we store a token as data,
  in a preserved `tokens` table (a directory).

  For example:

  ```
  tokens/cc224145f46a393f8ca71c4eb62aafe1/index.json
  tokens/5d551a1ca96496acd2c68eefcd294e88/index.json
  ...
  ```

  Where the pathname is the token itself,
  for the above example,
  the tokens are:

  ```
  cc224145f46a393f8ca71c4eb62aafe1
  5d551a1ca96496acd2c68eefcd294e88
  ...
  ```

  And each token data has a `issuer` property
  which is path pointing to a login target.

  Note that, there is one level of indirect here,
  when we want to know the `permissions` of a token,
  we read the `permissions.json` of the token's issuer.

- **Problem 4.3:** How should we represent permissions?

- **Solution 4.3:** We use a record (a JSON object) to represent permissions,
  where the key is a path pattern, and the value is an array of operations.

  An operation is composed of
  a kind parameter of HTTP API
  and a HTTP method
  (both are case insensitive):

  ```
  <kind-parameter>:<http-method>
  ```

  Example operations:

  ```
  data:post
  data:get
  data:put
  data:patch
  data:delete
  data-find:get
  file:post
  file:get
  file:put
  file:delete
  file-metadata:get
  directory:post
  directory:get
  directory:delete
  ```

  We use the [`micromatch`](https://github.com/micromatch/micromatch)
  glob matching library for our path pattern.

  For example, we want to have an admin token
  that can do everything to every directories.
  The permissions would be:

  ```
  {
    "**": [
      "data:post",
      "data:get",
      "data:put",
      "data:patch",
      "data:delete",
      "data-find:get",
      "file:get",
      "file:put",
      "file:delete",
      "file-metadata:get",
      "directory:post",
      "directory:get",
      "directory:delete"
    ]
  }
  ```

  For another example, when a user logged in,
  we want to give him/her a token
  that permits him/her to read and write his/hers own directory
  but to read all other users' `public` directories.

  Let's just suppose the user is me, and my username is `xieyuheng`.
  The permissions would be:

  ```
  {
    "users/xieyuheng/**": [
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
  ```

- **Problem 4.4:** How should a user use a token?

- **Solution 4.4:** When sending a HTTP request,
  a user should add the token to
  the [`Authorization` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization).

  The syntax of this header is:

  ```
  Authorization: <auth-scheme> <authorization-parameters>
  ```

  In our case, the `<auth-scheme>` should be `token`,
  and the `<authorization-parameters>` should be the token.

  For example:

  ```
  Authorization: token cc224145f46a393f8ca71c4eb62aafe1
  ```

  If no token is sent, a default token
  with default permissions will be used.

- **Problem 4.5:** How to config the default permissions?

- **Solution 4.5:** The most direct and minimal solution
  is to use a `default-permissions.json` file
  at the root of the database directory,
  which contains the value of the default permissions.

  For example, suppose we want all not logged in guests
  to be able to read all users public data.
  The permissions would be:

  ```
  {
    "users/*/public/**": [
      "data:get",
      "data-find:get",
      "file:get",
      "file-metadata:get",
      "directory:get"
    ]
  }
  ```

- **Problem 4.6:** What if a user want to grant permissions
  to operate on his/hers non-public data
  to some other users?

- **Solution 4.6:** One token issuer (login target) grant permissions to other token issuers, by writing a `granted-permissions.json` config file,
  in the grantee's directory.

  For example, the user `readonlylink` want to
  grant some permissions to `xieyuheng`:

  - Of course `readonlylink` must have permissions to the targets of the grant.

  ```
  [
    {
      "granter": "users/readonlylink",
      "permissions": {
        "users/readonlylink/**": [
          "file:get",
          "file:put",
          "file:delete",
          "file-metadata:get",
          "directory:post",
          "directory:get",
          "directory:delete"
        ]
      }
    },
    ...
  ]
  ```
