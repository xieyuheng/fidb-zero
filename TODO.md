# fidb init

[init] create `.config/default-token-issuer`
[init] create `.config/password-register-strategy`
[init] create users Ava Bella Carol Diana Eileen
[init] create example database for web apps

- personal note taking app -- with a frontend that can change backend at runtime

`database.json` with optional `server` and `logger`

`fidb init` log created files

# fidb serve-many

inline `startServer`

inline `createServer`

`fidb serve-many` -- serve many databases with subdomain-based routing

# readme

[readme] `fidb init`
[readme] `fidb serve`
[readme] `fidb serve-many`

# handle

[handle] support `HEAD` query

[handle] support contents hash based `PATCH` query

[handle] support nested `PATCH` for data

[handle] rate limit by ip -- for `password-register`

[config] be able to config rate limit

# schema

[manual] schema

use `x-json` instead of `xieyuheng/ty`

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
