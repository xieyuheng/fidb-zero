---
title: kind=password-login
---

## POST {data-file}?kind=password-login

Login a user by password.

For example:

```
POST users/xieyuheng?kind=password-login

{
  "password": "123456"
}
```

Upon success, a token will be returned.

For example:

```
{
  "token": "cc224145f46a393f8ca71c4eb62aafe1"
}
```

Upon login, we store a token as a data file in `.tokens` directory.

For example:

```
.tokens/cc224145f46a393f8ca71c4eb62aafe1/index.json
```

And each token data has an `issuer` property
which is path pointing to a login target.

Example token data:

```
{
  "issuer": "users/xieyuheng/.token-issuer",
  "@path": ".tokens/cc224145f46a393f8ca71c4eb62aafe1",
  ...
}
```

Note that, there is one level of indirect here,
when we want to know the `permissions` of a token,
we read it from the token's `issuer` instead of from the token data.

## Permissions

We use a record (a JSON object) to represent permissions,
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
glob matching library for our path patterns.

Given a path and an operation, the path patterns of the permissions
will be matched one by one, for a matching path pattern,
we see if the operation is included in the array of operations,
if it is not included, we go on to try the next one,
the matching fails only when all entries of the permissions are failed.

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
    "file:post",
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

For another example, when a user is logged in,
we want to give him/her a token
that permits him/her to read and write his/hers own directory
but only to read all other users' `public` directories.

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
