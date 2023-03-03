```
fidb serve-reverse-proxy --port 8080 --port 5108 \
 --database tmp/databases/reverse-proxy \
 --domain cicada.localhost

fidb serve-website ~/learn-x/learn-alpinejs/notepad \
  --reverse-proxy http://notepad.cicada.localhost:8080

fidb serve-website ~/learn-x/learn-alpinejs/notepad \
  --reverse-proxy http://notepad.cicada.localhost:5108
```

# reverse-proxy interface

[reverse-proxy] `fidb serve-database` take `--reverse-proxy` -- no auth for now

[reverse-proxy] `fidb serve-website` take `--reverse-proxy` -- no auth for now

setup `LoginReverseProxyServerCommand`

- `fidb login-reverse-proxy-server <server-url> --port --port`

`LoginReverseProxyServerCommand` use client of reverse-proxy-server

[reverse-proxy] database `users/` -- user has `subdomains`

[reverse-proxy] `handlePassword` -- `password-register`
[reverse-proxy] `handlePassword` -- `password-login`

[reverse-proxy] `handleReverseProxyTarget` -- `POST` -- check `password`

# reverse-proxy messaging

[reverse-proxy] extract general proxy messaging pattern

[reverse-proxy] encrypt tcp message by token

[reverse-proxy] remove target on disconnect

[reverse-proxy] `fidb serve-database` -- ping the socket to keep it alive

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
