remove tests by resource

fix resource function naming

re-org manual by resource

fix the use of `loginTargets` in  `password-register-strategy` -- should be normalized

`permissions` should be an array -- to support sum type

- support permission group -- like unix user group

  - should not copy permissions to every user, should use permission group

# handle

[handle] support `HEAD` query

[handle] support nested `PATCH` for data

[handle] support contents hash based query

- return file content only when it's hash is different
- return a list of newer file contents

# rate limit

[handle] rate limit by ip -- for `password-register`

[config] be able to config rate limit

# schema

[manual] schema

use `x-json` instead of `xieyuheng/ty`

should we use `x-json` for both schema and inedx?

# indexing

b-tree over file system

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.dataFind` -- use index

`Db.dataFind` -- support inline a `{ @ref }` which is a path to another data

# image

[image] support compression

# docs

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
