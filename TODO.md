# authentication by password -- for any directory

`Password` and `passwordSchema`

db/createPassword(directory: string, password: string): Promise<void>
db/signinPassword(directory: string, password: string): Promise<Token>

# authentication by email -- for any directory

`Email` and `passwordEmail`

`db/createEmail`
`db/signinEmail`

# token with scope

```
data:read
data:update

directory:read
directory:update

file:read
file:update
```

# data link

```
fidb:users/xieyuheng
fidb+https://localhost:3000/users/xieyuheng
```

# indexing

b-tree over file system

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index

`Db.find` -- support deref a property which is an `id` to another data

# schema

# reverse proxy

```
fidb serve-reverse-proxy <database>
fidb serve <database> --reverse-proxy-server <url> --reverse-proxy-user <user> --reverse-proxy-password <password>
```
