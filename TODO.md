# database

Database.createIndex(key)

Database.find -- with index

# schema

[maybe] Use json to represent schema.

[datalog] Schema is constraints on data table,
which is checked upon every update to that table.

```whereabouts
User { username, name } -- {
  String username
  String name
}

Post { title, content, author } -- {
  String title
  String content
  Link [author, User] // Id to existing User
}
```

# generate rest api

learn from surrealdb and edgedb

# command line interface
