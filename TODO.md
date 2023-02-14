# token

`Db.patch` take `path`, do not forget to normalize `@path`
`Db.put` take `path`, do not forget to normalize `@path`
`Db.delete` take `path`, do not forget to normalize `@path`

`dataSchema` with given type

[db] `checkToken`

`Db` api take `token` as arg

[token] store `fidb/tokens/<token-name>`

[token] admin and readonly token -- used by `fidb-manager`

# password login

# mail login

# data link

```
fidb:users/xieyuheng
```

# indexing

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index

`Db.find` -- support deref a property which is an `id` to another data

# schema

# fi

`Fi.get`
`Fi.put`

use `<name>.metadata` postfix for metadata in json format
