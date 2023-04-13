[token] use default token

handle-data-default-token.test.ts
handle-file-default-token.test.ts

# schema

[manual] schema

use `x-schema` instead of `xieyuheng/ty`

# docs

[manual] command-line
[manual] management

- `admins/` has password

[manual] indexing

# token

[token] each directory can grant access to token owner

# fidb database:deploy

Like `fidb website:deploy`.

This command will only be meaningful
if we have some scripts to generate database and datasets.

# handle

[handle] rate limit by ip -- for `password-register`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] RegisterEmail(directory, options): Promise<void>
[db] LoginEmail(directory, options): Promise<Token>

[handle] `handleEmail` -- `kind=email-register`
[handle] `handleEmail` -- `kind=email-login`

# indexing

b-tree over file system

`Db.index(db, directory, key)`
`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index
`Db.find` -- support deref a property which is a path to another data
