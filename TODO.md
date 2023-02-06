[db] rename `Db.directories` to `Db.listDirectories`

[db] `Db.findPage` -- like `Db.find` but page by page

- `type FindPageOptions = { page, size } & FindOptions` -- starting from 0

[rest] `/:directory` -- return metadata

[rest] `/:directory?page&size&properties` -- `Db.findPage`

# token based permission

[permission] schema for token -- has `permission` and `date`

[permission] store `fidb-tokens/<token-name>`

fidb-manager use admin token

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
