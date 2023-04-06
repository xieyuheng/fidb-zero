# docs

move `password*` from `db/` to `password/`

[manual] the-http-api -- kind=file
[manual] the-http-api -- kind=directory

[manual] access-token

- rename `permissionRecord` to `permissions`

[manual] register-and-login
[manual] indexing
[manual] schema
[manual] config

- `rateLimits`

[token] each directory can grant access to token owner

# refactor

web server and reverse-proxy should be its own project

# fidb reverse-proxy:connect

`fidb reverse-proxy:connect` -- can be used without `fidb website:serve`

# reverse-proxy -- by zmq

[reverse-proxy] support cname -- test this by mimor.app
[reverse-proxy] `brokerPrepareWorker` -- error on not find service
[reverse-proxy] rename channel to service -- little by little -- see about the use of the name

# fidb router

# fidb website:deploy

one machine

many machine -- one master many works

- what are other patterns? learn from ZMQ guide

# fidb database:deploy

Like `fidb website:deploy`.

This command will only be meaningful
if we have some scripts to generate database and datasets.

# database-server

[database-server] rate limit by ip -- for `password-register`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] RegisterEmail(directory, options): Promise<void>
[db] LoginEmail(directory, options): Promise<Token>

[database-server] `handleEmail` -- kind=email-register
[database-server] `handleEmail` -- kind=email-login

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

# x-schema
