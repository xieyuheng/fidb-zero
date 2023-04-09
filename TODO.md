[token] `Token` has `issuer` that points to `login-targets/**`
[password] remove `password.permissions`

[manual] access-token -- user be able to grant access to token owner
[manual] register-and-login

# docs

[manual] schema
[manual] indexing
[manual] command-line
[manual] management

- `admins/` has password

# token

[token] `default-permissions.json` -- used when no token is provided
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
