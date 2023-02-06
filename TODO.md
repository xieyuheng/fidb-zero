# console

setup `console/`

[command] `fidb serve`

# fidb-manager

# rest tests

[rest] `serve` only handle `"Content-Type: application/json"`

[rest] test using `fetch`

# token based permission

[permission] schema for token -- has `permission` and `date`

[permission] store `fidb-tokens/<token-name>`

fidb-manager use admin token

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
