# revision

every `Data` has `@commit` -- just like couchdb

- can update an object only when the `@commit` is the same
- should not call `@revision` or `@rev` -- which suggests version control
- use long random string -- not uuid

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

`Fi.save` -- API for saving file with metadata

- use `<name>.metadata` postfix

# learn

[learn] from surrealdb
[learn] from edgedb
[learn] from couchdb
