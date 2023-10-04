---
title: kind=password-login
---

## POST users/{user}?kind=password-login

Login a user by password.

For example:

```
POST users/xieyuheng?kind=password-login

{
  "password": "123456"
}
```

Upon success, a token will be returned:

```
{
  "token": "cc224145f46a393f8ca71c4eb62aafe1"
}
```

Upon login, we store a token as a data file in `.tokens` directory:


```
.tokens/cc224145f46a393f8ca71c4eb62aafe1/index.json
```

And each token data has an `issuer` property
which records who issued this token:

```
{
  "issuer": "users/xieyuheng/.token-issuer",
  "@path": ".tokens/cc224145f46a393f8ca71c4eb62aafe1",
  ...
}
```

When handling a HTTP request,
the token in the request will be used to find the issuer.
From the issuer we can find the groups of the requesting user.

The information about groups is not saved directly in token,
so that when we want to change a user's groups,
we can simply edit the `.token-issuer` of the user,
instead of updating every token of the user.
