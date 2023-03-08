`fidb website:serve` and `fidb database:serve` change `--url` to `--public-url`
[website-server] `Context` has `cacheControlPatterns`
`fidb website:serve` support `--cache-control`
[website-server] `--spa` as a shorthand for `--rewrite-not-found-to index.html` and the `spaCacheControlPatterns`

# reverse-proxy

move `reverse-proxy/` to `reverse-proxy-over-tcp/`

[reverse-proxy-over-tcp] `ChannelServerOverTCP` and `ChannelClientOverTCP`

- `ChannelServerOverTCP` -- `bind`, `accept`, `send`, `receive`
- `ChannelClientOverTCP` -- `connect`, `send`, `receive`

[reverse-proxy-over-tcp] set socket to keep alive
[reverse-proxy-over-tcp] ping the socket to keep the socket alive
[reverse-proxy-over-tcp] restart on `ChannelSocket` close

[reverse-proxy] `ChannelServer` and `ChannelClient` interface

[reverse-proxy] how to make `ChannelServer` and `ChannelClient` a component?

- zmq sockets are primitive messaging patterns
- we can define new pattern from exiting patterns
- the interface of used defined patterns must be the same as primitive patterns

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
