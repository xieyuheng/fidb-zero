use prettier

# database

Database.index(table, key)
Database.createIndex(table, key)

-

Database.find -- with index

every object has `@revision` -- just like couchdb

- can update an object only when the `@revision` is the same

[learn] prisma -- API design -- for example `findMany`

- `find` might deref a property which is an id to another data

`parseId` -- table + name

token based

- schema for token

- .fidb/tokens/<name>.json

  store detailed `permissions`

config

- .fidb/config.json

# learn

[learn] from surrealdb
[learn] from edgedb
[learn] from couchdb

# serve http rest api

# deno script interface

support serve

# command line interface

support serve
