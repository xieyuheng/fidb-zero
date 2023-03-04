# reverse-proxy interface

[command-line] can config `log` to output `json` -- for scripting

catch `JSON.parse` error

# reverse-proxy messaging

[reverse-proxy] extract general proxy messaging pattern

- learn from zmq tcp multipart message -- instead of using `keySize`

[reverse-proxy] encrypt tcp message by token

[reverse-proxy] remove target on disconnect

[reverse-proxy] `fidb database:serve` -- ping the socket to keep it alive

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
