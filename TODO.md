# reverse-proxy

[reverse-proxy] ambr ReverseProxyTarget Target
[reverse-proxy] `Target` should be a pure object
[reverse-proxy] extract general proxy messaging pattern
[reverse-proxy] learn about TCP and UDP low level details
[reverse-proxy] proxy use UDP to communicate with the target

[reverse-proxy-server] remove target if a client disconnect
[reverse-proxy-server] remove queued data when a request timeout

[reverse-proxy-client] ping the socket to keep the socket alive
[reverse-proxy-client] restart on `proxySocket` close

[reverse-proxy] encrypt TCP message by token

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
