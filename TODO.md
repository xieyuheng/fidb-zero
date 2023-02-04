# revision

every object has `@revision` -- just like couchdb

- use long random string -- not uuid
- can update an object only when the `@revision` is the same

# index

Db.index(db, table, key)
Db.createIndex(db, table, key)

Db.find -- with index

# fi

`Fi.save` -- API for saving file with metadata

- use `<name>.metadata` postfix

# find

[learn] prisma -- API design -- for example `findMany`

- `find` might deref a property which is an id to another data

`parseId` -- table + name

# permission

token based permission

- schema for token

- .fidb/tokens/<name>.json

  store detailed `permissions`

# config

`.fidb/config.json`

# learn

[learn] from surrealdb
[learn] from edgedb
[learn] from couchdb

# http rest api

# script interface

support serve

# command line interface

support serve
