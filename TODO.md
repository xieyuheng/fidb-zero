# reverse-proxy

`utils/log` take `kind?` instead of `isError`
[reverse-proxy] `fidb dev` for local -- `fidb serve` for reverse-proxy (with default reverse-proxy-server)
[reverse-proxy] setup `fidb-app-website` project
[reverse-proxy] design the database -- "user has subdomains"
[reverse-proxy] `fidb serve` take `--reverse-proxy-subdomain`
[reverse-proxy] `fidb serve` serve both website and database
[reverse-proxy] `handleReverseProxyTarget` -- `POST` -- check `password`
[reverse-proxy] `fidb serve` -- ping the socket to keep it alive
[reverse-proxy] try to restart on `proxySocket` close

# rest

[rest] rate limit by ip -- for `password-sign-up`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] signUpEmail(directory, options): Promise<void>
[db] signInEmail(directory, options): Promise<Token>

[rest] `handleEmail` -- kind=email-sign-up
[rest] `handleEmail` -- kind=email-sign-in

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
