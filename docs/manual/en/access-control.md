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

## Using Access Token

When sending a HTTP request,
a user should add the access token to
the [Authorization HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization).

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

## .guest-token-issuer

We use `.guest-token-issuer` data file to config the default permissions,
which contains a `permissions` property
for the default permissions.

For example, suppose we want all guests
to be able to read all users public data:

```
{
  "permissions": {
    "users/*/public/**": [
      "data:get",
      "data-find:get",
      "file:get",
      "file-metadata:get",
      "directory:get"
    ]
  }
}
```

And we can use a token named `default` to point to the default issuer.

The token file should be:

```
.tokens/guest/index.json
```

The token data could be:

```
{
  "issuer": ".guest-token-issuer"
}
```
