remove `owner` from `token`

`Token` has `issuer` that points to `login-targets/**`

# docs

fix the use of `password.permissions`

- Old solution: each password has `permissions` property
  and can generate token with this `permissions` and path pattern `<this-directory>/**`,
  and the permissions of a password is given by `authDirectories` in the `database.json` config.

operation with kind prefix

`default-permissions.json` -- used when no token is provided

[manual] access-token -- user be able to grant access to token owner
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
