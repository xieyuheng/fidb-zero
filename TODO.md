ambr handleRequest handle

# reverse-proxy

[reverse-proxy] `handleRequestReverseProxyTarget` -- handle `POST`

[reverse-proxy] `ReverseProxyWaiter` -- for the order of messages

[reverse-proxy] `handleRequest` -- handle normal request

[command] `fidb serve` with reverse-proxy

```
fidb serve <database> --reverse-proxy-server <url> --reverse-proxy-user <user> --reverse-proxy-password <password>
```

# rest

[rest] rate limit by ip -- for `password-sign-up`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] signUpEmail(directory, options): Promise<void>
[db] signInEmail(directory, options): Promise<Token>

[rest] `handleRequestEmail` -- kind=email-sign-up
[rest] `handleRequestEmail` -- kind=email-sign-in

# token with scope

```
data:read
data:update

directory:read
directory:update

file:read
file:update
```

# indexing

b-tree over file system

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index

# data link

`Db.find` -- support deref a property which is a path to another data

```
fidb:users/xieyuheng
fidb+https://localhost:3000/users/xieyuheng
```

# schema
