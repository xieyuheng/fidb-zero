[db] `Db.getFileOrFail`
[db] `Db.getFile`
[db] `Db.putFile`

[rest] `handleRequestFile` -- `PUT` support `application/octet-stream`

[db] tests/db-put-file-get-file.test.ts

# password login

# mail login

# data link

```
fidb:users/xieyuheng
fidb+https://localhost:3000/users/xieyuheng
```

# indexing

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index

`Db.find` -- support deref a property which is an `id` to another data

# schema

# proxy server

`fidb proxy` -- start a proxy server

`fidb connect` -- connect to proxy server
