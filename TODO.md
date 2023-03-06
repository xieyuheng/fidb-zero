# reverse-proxy

[reverse-proxy-server] `acceptConnection` use `localServerId` to get `ChannelInfo`

[reverse-proxy-server] extract `createChannelServer`

- There should only be one `channelServer`.

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
