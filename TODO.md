services/make/makeUser

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
