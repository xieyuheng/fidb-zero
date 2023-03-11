# reverse-proxy -- by zmq

[reverse-proxy-server] `handleDispatch` add `service` to `broker` -- with initial `request`
[reverse-proxy-server] `handleDispatch` use `encryptionKey` when adding `service` to `broker`

[reverse-proxy] `workerListen`

[reverse-proxy-client] `connect` use `Worker` -- instead of `ChannelWorker`

[reverse-proxy-server] use `Broker` -- instead of `Channel`

[reverse-proxy] support encryption again -- use `encryptionKey`

# reverse-proxy

[reverse-proxy] set socket to keep alive
[reverse-proxy] ping the socket to keep the socket alive
[reverse-proxy] restart on `channelSocket` close

# website-server

[website-server] `Context` has `cacheControlPatterns`
`fidb website:serve` support `--cache-control`
[website-server] `--spa` as a shorthand for `--rewrite-not-found-to index.html` and the `spaCacheControlPatterns`

# reverse-proxy over zeromq

which pattern to use?

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
