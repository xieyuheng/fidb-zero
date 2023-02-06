# console

setup `console/`

[command] `fidb serve`

# fidb-manager

setup new frontend project

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

`Db.find` -- support deref a property which is an `id` to another data

# fi

`Fi.get`
`Fi.put`

use `<name>.metadata` postfix for metadata in json format
