# revision

every `Data` has `@revision` -- just like couchdb

- can update an object only when the `@revision` is the same
- use long random string -- not uuid

`@deleted: boolean` -- soft deletion with `@revision`

# http rest api

# script interface

`serve`

# command line interface

use `serve`

# permission

token based permission

schema for token -- permission and date

`.fidb/tokens/<token>` -- store `{ permissions }`

# index

`Db.index(db, table, key)`

`Db.createIndex(db, table, key)`

# find

`Db.find` -- use index

[learn] prisma -- API design -- for example `findMany`

- `find` might deref a property which is an id to another data

# fi

`Fi.get`
`Fi.put`

use `<name>.metadata` postfix for metadata in json format

# learn

[learn] from surrealdb
[learn] from edgedb
[learn] from couchdb
