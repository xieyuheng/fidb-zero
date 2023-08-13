# fidb database:deploy

`fidb website:deploy`

# handle

[handle] support `HEAD` query

[handle] support contents hash based `PATCH` query

[handle] support nested `PATCH` for data

[handle] rate limit by ip -- for `password-register`

[config] be able to config `rateLimits: { ... }`

# schema

[manual] schema

use `x-schema` instead of `xieyuheng/ty`

# image

[image] support compression

# docs

[manual] command-line

[manual] management

- `admins/` has password

[manual] indexing

# token

[token] each directory can grant access to token owner

# authentication by email -- for any directory

[db] `emailRegister(directory, options): Promise<void>`

[db] `emailLogin(directory, options): Promise<Token>`

[handle] `handleEmail` -- `kind=email-register`

[handle] `handleEmail` -- `kind=email-login`

# indexing

b-tree over file system

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index

`Db.find` -- support deref a property which is a path to another data

# generate

scripts to generate database and datasets.
