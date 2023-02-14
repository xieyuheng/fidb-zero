# tokens

`Db` api should not use `fs` directly

`unauthorized.test.ts` -- `deleteDirectory`
`unauthorized.test.ts` -- `isFile`

`Db` api take `path` as arg

[permission] `Token` and `tokenSchema` -- has `permission`

[db] `checkToken`

`Db` api take `token` as arg

[permission] store `fidb/tokens/<token-name>`

[permission] admin and readonly token -- used by `fidb-manager`

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
