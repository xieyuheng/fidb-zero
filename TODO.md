# schema

[schema] use javascript to write schema

# file content hash

[file] support content hash based query

- return file content only when it's hash is different
- return a list of newer file contents

# rate limit

[rate limit] be able to config rate limit of a resource
[rate limit] rate limit by ip -- for `password-register`

# quota

[quota] for storage and transfer

# indexing

[indexing] use javascript to config indexing of different path
[indexing] b-tree over file system
[indexing] `index(db, directory, key)`
[indexing] `createIndex(db, directory, key)`
[indexing] `dataFind` -- use index
