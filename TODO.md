# reverse-proxy

[reverse-proxy] should only encrypt `Message` `body`
[reverse-proxy] `Message` change `isEnd` to `kind: string`

[reverse-proxy] also encrypt TCP message request

[reverse-proxy] translate the socket stream into a `DataStream` early -- for geting the first special data

- use async generator

  a stream not only has 'data' event,
  but also has 'end' event and 'error' event,
  how should async generator implement these?

[reverse-proxy-server] there should only be one `channelServer`

- `acceptConnection` -- first data should be an `id` that maps to `ChannelOptions`

[reverse-proxy-client] ping the socket to keep the socket alive

[reverse-proxy-client] restart on `ChannelSocket` close

# reverse-proxy over UDP

[reverse-proxy] learn about UDP

[reverse-proxy] channel server over UDP

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
