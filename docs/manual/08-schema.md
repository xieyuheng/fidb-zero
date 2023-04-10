---
title: Schema
---

We need to use json to describe schema of json data.

We can not use [json-schema](https://json-schema.org/understanding-json-schema/index.html),
because instead of writing:

```
{
  "type": "object",
  "properties": {
    "age": { "type": "number" },
    "name": { "type": "string" }
  }
}
```

We want to write something like:

```
{
  "name": "string",
  "age": "number"
}
```

How can we achieve this?

TODO
