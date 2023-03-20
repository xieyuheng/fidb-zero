# fidb reverse-proxy:connect

`fidb reverse-proxy:connect` -- can be used without `fidb website:serve`

# fidb website:deploy

one machine

many machine -- one master many works

- what are other patterns? learn from ZMQ guide

# fidb database:deploy

# reverse-proxy -- by zmq

[reverse-proxy] `brokerPrepareWorker` -- error on not find service
[reverse-proxy] rename channel to service -- little by little -- see about the use of the name

# rest

[rest] rate limit by ip -- for `password-register`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] RegisterEmail(directory, options): Promise<void>
[db] LoginEmail(directory, options): Promise<Token>

[rest] `handleEmail` -- kind=email-register
[rest] `handleEmail` -- kind=email-login

# token with scope

```
data:read
data:update

directory:read
directory:update

file:read
file:update
```

# indexing

b-tree over file system

`Db.index(db, directory, key)`

`Db.createIndex(db, directory, key)`

# find

`Db.find` -- use index

# data link

`Db.find` -- support deref a property which is a path to another data

```
fidb:users/xieyuheng
fidb+https://localhost:3000/users/xieyuheng
```

# schema
