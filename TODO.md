# reverse-proxy

`handleReverseProxyTarget` throw ? -- keep the socket

[command] `fidb serve` with reverse-proxy

```
fidb serve <database> --reverse-proxy-server <url> --reverse-proxy-username <username> --reverse-proxy-password <password>
```

[reverse-proxy] `handleReverseProxyTarget` -- `POST` -- check `password`

[reverse-proxy] `handleDefault` -- need to parse end of http request -- instead of just use `socketData`

[reverse-proxy] `ReverseProxyTarget` -- ping the socket to keep it alive

[reverse-proxy] `ReverseProxyTarget` -- `socket.on` need to parse end of http request

[reverse-proxy] `handleDefault` -- find target by request `host`

# rest

[rest] rate limit by ip -- for `password-sign-up`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] signUpEmail(directory, options): Promise<void>
[db] signInEmail(directory, options): Promise<Token>

[rest] `handleEmail` -- kind=email-sign-up
[rest] `handleEmail` -- kind=email-sign-in

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
