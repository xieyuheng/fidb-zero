# fidb serve-many

`fidb serve-many` -- serve many databases with subdomain-based routing

# fidb init

[init] create example database for a wiki system -- x-wiki

The idea of an example fidb app:

x-news

- https://lobste.rs/about
- https://news.ycombinator.com
- https://www.reddit.com
- http://lambda-the-ultimate.org

x-wiki

- https://en.wikipedia.org/wiki/English_Wikipedia
- https://en.wikipedia.org/wiki/WikiWikiWeb

# handle

[handle] support `HEAD` query

[handle] support contents hash based `PATCH` query

[handle] support nested `PATCH` for data

# rate limit

[handle] rate limit by ip -- for `password-register`

[config] be able to config rate limit

# schema

[manual] schema

use `x-json` instead of `xieyuheng/ty`

# image

[image] support compression

# docs

[manual] management

- `admins/` has password

[manual] indexing

# token

[token] each directory can grant access to token owner

# authentication by email -- for any directory

[db] `emailRegister(directory, options): Promise<void>`

[db] `emailLogin(directory, options): Promise<Token>`

[handle] `handleEmail` -- `kind=email-register`

[handle] `handleEmail` -- `kind=email-login`

# indexing

b-tree over file system

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.dataFind` -- use index

`Db.dataFind` -- support inline a `{ @ref }` which is a path to another data
