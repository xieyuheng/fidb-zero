[rest] [refactor] `serve`

# token based permission

[permission] schema for token -- has `permission`

[permission] store `fidb/tokens/<token-name>`

[permission] admin and readonly token -- used by `fidb-manager`

# index

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index

`Db.find` -- support deref a property which is an `id` to another data

# fi

`Fi.get`
`Fi.put`

use `<name>.metadata` postfix for metadata in json format
