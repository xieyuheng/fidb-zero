# reverse-proxy interface

`fidb login-reverse-proxy` -- read password from command-line
`fidb login-reverse-proxy` -- save token to `FIDB_DIR` -- `~/.fidb/`
[reverse-proxy-server] database `users/` -- user has `subdomains`
[reverse-proxy-server] `handleReverseProxyTarget` -- `POST` -- check `password`

# reverse-proxy test

[command-line] `tests/` -- be able to test command

- need to setup example website
- need to run command in `child_process`
- need to use node http client -- which can mock DNS server

# reverse-proxy messaging

[reverse-proxy] extract general proxy messaging pattern

- learn from zmq tcp multipart message -- instead of using `keySize`

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
