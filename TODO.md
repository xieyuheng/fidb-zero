[docs] zh manual -- group-and-permissions.md

[maybe] "Access Control Matrix" as API

# refactor

simplify the access control so that we have the concept of user

- a user have a `.token-issuer`
- we do not need any target because only user can login
- access token map to `.token-issuer` not user
  - a user might be deleted and recreated again,
    the old token can not be used for the new uesr.

[permission] `permissions` should be an array -- to support sum type

- support permission group -- like unix user group

  - should not copy permissions to every user, should use permission group

# docs


[docs] update en manual about password register and login

[docs] FiDB Manager

# data

[data] support `HEAD` query

# data-find

[data-find] support nested `PATCH` for data

# file

[file] support contents hash based query

- return file content only when it's hash is different
- return a list of newer file contents

# rate limit

[rate limit] be able to config rate limit of a resource

[rate limit] rate limit by ip -- for `password-register`

# schema

[schema] [maybe] use `x-json` instead of `xieyuheng/ty`

[schema] should we use `x-json` for both schema and index?

# indexing

[indexing] how to config indexing of data resource?

[indexing] b-tree over file system

[indexing] `index(db, directory, key)`

[indexing] `createIndex(db, directory, key)`

# data-find

[data-find] `dataFind` -- use index
