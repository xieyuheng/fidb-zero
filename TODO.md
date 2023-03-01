db rename test names

improve `authDirectoryConfig`

# reverse-proxy

[reverse-proxy] support login
[reverse-proxy] `handleReverseProxyTarget` -- `POST` -- check `password`
[reverse-proxy] user has subdomains
[reverse-proxy] `fidb serve` take `--reverse-proxy-subdomain`

[reverse-proxy] encrypt tcp message by token

[reverse-proxy] `fidb serve` -- ping the socket to keep it alive

- try to restart on `proxySocket` close
- learn from ZMQ

# rest

[rest] rate limit by ip -- for `password-register`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] RegisterEmail(directory, options): Promise<void>
[db] LoginEmail(directory, options): Promise<Token>

[rest] `handleEmail` -- kind=email-register
[rest] `handleEmail` -- kind=email-login

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
