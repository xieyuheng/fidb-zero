# functional api

`Database` as pure data -- instead of class

- describing the configuration of the database

createDatabase({ path })

Db.resolve(db: Database, path: string): string
Db.create(db: Database, prefix: string, json: JsonObject): Promise<Data>
Db.put(db: Database, id: string, json: JsonObject): Promise<Data>
Db.getOrFail(db: Database, id: string): Promise<Data>
Db.get(db: Database, id: string): Promise<Data | undefined>
Db.patch(db: Database, id: string, json: JsonObject): Promise<Data>
Db.delete(db: Database, id: string): Promise<void>
Db.deleteAll(db: Database, prefix: string): Promise<void>
Db.*all(db: Database, prefix: string): AsyncIterable<Data>
Db.*find(db: Database, prefix: string, options: FindOptions): AsyncIterable<Data>

# revision

every object has `@revision` -- just like couchdb

- can update an object only when the `@revision` is the same

# index

Db.index(db, table, key)
Db.createIndex(db, table, key)

Db.find -- with index

# find

[learn] prisma -- API design -- for example `findMany`

- `find` might deref a property which is an id to another data

`parseId` -- table + name

# permission

token based permission

- schema for token

- .fidb/tokens/<name>.json

  store detailed `permissions`

# config

`.fidb/config.json`

# learn

[learn] from surrealdb
[learn] from edgedb
[learn] from couchdb

# http rest api

# script interface

support serve

# command line interface

support serve
