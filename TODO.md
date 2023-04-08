# docs

fix the use of `password.permissions`

- current each password has permissions and generate token
  with this permissions to this directory/\*\*,
  and the permissions of a password is given by authDirectories config.

- conditions:

  - any data directory that has a password can be used to do password login.
  - upon a password login a token is generated and return in response.
  - the permissions of login token can be configed.
  - maybe use password-login-strategies.json to do the config.

    ```
    loginDirectories: { [pattern]: { permissions: .. } }
    ```

operation with kind prefix

```
data:post
data:get
data:put
data:patch
data-find:get
directory:get
directory:post
file:get
file:put
file-metadata:get
```

default token -- when no token is provided

[manual] access-token -- path patterns and permissions
[manual] register-and-login
[manual] schema
[manual] indexing
[manual] command-line
[manual] management

[token] each directory can grant access to token owner

# fidb database:deploy

Like `fidb website:deploy`.

This command will only be meaningful
if we have some scripts to generate database and datasets.

# database-server

[database-server] rate limit by ip -- for `password-register`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] RegisterEmail(directory, options): Promise<void>
[db] LoginEmail(directory, options): Promise<Token>

[database-server] `handleEmail` -- `kind=email-register`
[database-server] `handleEmail` -- `kind=email-login`

# indexing

b-tree over file system

`Db.index(db, directory, key)`
`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index
`Db.find` -- support deref a property which is a path to another data

# x-schema
