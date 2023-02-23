# authentication by password -- for any directory

[db] signUpPassword(directory: string, password: string): Promise<void>
[db] signInPassword(directory: string, password: string): Promise<Token>

[rest] `handleRequestPassword` -- kind=password-sign-up
[rest] `handleRequestPassword` -- kind=password-sign-in

# authentication by email -- for any directory

[db] signUpEmail(directory: string, address: string): Promise<void>
[db] signInEmail(directory: string, address: string): Promise<Token>

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
