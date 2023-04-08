# docs

[manual] the-http-api -- `kind=directory`
add `createdAt` and `updatedAt` to file metadata
[manual] the-http-api -- `kind=file-metadata`
[manual] the-http-api -- `kind=data-find`
[manual] access-token -- path patterns and scoped permissions
[manual] config
[manual] register-and-login
[manual] indexing
[manual] schema

[token] each directory can grant access to token owner

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
