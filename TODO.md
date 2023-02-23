`Database` has `config: DatabaseConfig`

`createDatabase` load `database.json` to `config`

[config] `database.json` -- with `name` and optional `description`

[config] `database.json` -- config which directory can be used for sign up

[rest] `handleRequestPassword` -- `kind=password-sign-up` -- create initial data and call `signUpPassword`

# authentication by password -- for any directory

rest-password-sign-in-and-sign-up.test.ts

[rest] rate limit by ip -- for `password-sign-up`

# authentication by email -- for any directory

[db] signUpEmail(directory, options): Promise<void>
[db] signInEmail(directory, options): Promise<Token>

[rest] `handleRequestEmail` -- kind=email-sign-up
[rest] `handleRequestEmail` -- kind=email-sign-in

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
