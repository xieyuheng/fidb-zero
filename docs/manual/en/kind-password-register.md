---
title: kind=password-register
---

## POST users/{user}?kind=password-register

Register a user by password, to prepare a user for future logins.

For example:

```
POST users/xieyuheng?kind=password-register

{
  "password": "123456",
  "data": {
    "username": "xieyuheng",
    "name": "Xie Yuheng"
  }
}
```

Upon success, the following data files will be created:

```
users/xieyuheng/index.json
users/xieyuheng/.password/index.json
users/xieyuheng/.token-issuer/index.json
```

`users/xieyuheng/index.json`
is initialized from the `data` of the request:

```
{
  "username": "xieyuheng",
  "name": "Xie Yuheng",
  "@path": "users/xieyuheng",
  "@revision": "1b0d4dc0b6e68853aa0005b03c059a47",
  "@createdAt": 1681389842021,
  "@updatedAt": 1681389842021
}
```

We save password safely in `users/xieyuheng/.password/index.json`
by [brcryt](https://en.wikipedia.org/wiki/Bcrypt):

```
{
  "hash": "$2b$10$HpzyzH0jUr/h5H27Z9F4mew9ijI6cbPldhH9OYJOXqXK.O.qxuKfW",
  "@path": "users/xieyuheng/.password",
  "@revision": "ae937631eeec83a8edd2cbd381763274",
  "@createdAt": 1681389842021,
  "@updatedAt": 1681389842021
}
```

`users/xieyuheng/.token-issuer/index.json` records
the user name and the groups of the user:

```
{
  "user": "xieyuheng",
  "groups": [ "user" ],
  "@path": "users/xieyuheng/.token-issuer",
  "@revision": "66937631eeec83a8edd2cbd381763274",
  "@createdAt": 1681389842021,
  "@updatedAt": 1681389842021
}
```
