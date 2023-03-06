[diary] http reverse proxy server

- solution 1

  http reverse proxy server = http server + tcp channel server

# reverse-proxy

[reverse-proxy-server] there should only be one `channelServer`

- `acceptConnection` -- first data should be a `token` that maps to `ChannelOptions`

- the `token` will also be used to encrypt data

- translate the socket stream into a `DataStream` early

  - use async generator

    a stream not only has 'data' event,
    but also has 'end' event and 'error' event,
    how should async generator implement these?

  - The first data length should be limited,
    because I do not trust you yet,
    before I got the token.

    Beside the key, the client should also send an encrypted message
    for the server to check.

    It does not matter that it is a middle man passing the token,
    because all future data will be encrypted by a key
    that the middle man does not know.

[reverse-proxy] learn about TCP and UDP low level details
[reverse-proxy] proxy use UDP to communicate with the target

[reverse-proxy-client] ping the socket to keep the socket alive
[reverse-proxy-client] restart on `proxySocket` close

[reverse-proxy] encrypt TCP message

- can not use the `token` (the first data) as key,
  the key should be exchanged during https.

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
