# reverse-proxy

[diary] design the command line interface

```
fidb serve-database <directory> --port 5108 \
  --reverse-proxy-server https://fidb.app:5108 \
  --reverse-proxy-subdomain pomodoro \
  --reverse-proxy-username xieyuheng \
  --reverse-proxy-password abc

database served at:

  http://localhost:5108
  https://pomodoro.fidb.app:5108

fidb login-reverse-proxy-server https://fidb.app:5108

fidb serve-database <directory> --port 5108 --reverse-proxy https://pomodoro.fidb.app:5108

database served at:

  http://localhost:5108
  https://pomodoro.fidb.app:5108

fidb serve-website <directory> --port 8080 \
  --reverse-proxy-server https://fidb.app \
  --reverse-proxy-subdomain pomodoro \
  --reverse-proxy-username xieyuheng \
  --reverse-proxy-password abc

website served at:

  http://localhost:8080
  https://pomodoro.fidb.app

fidb serve-reverse-proxy <directory> --port 5108 \
  --tls-cert /etc/letsencrypt/live/fidb.app/fullchain.pem \
  --tls-key /etc/letsencrypt/live/fidb.app/privkey.pem

reverse-proxy served at:

  https://127.0.0.1:5108

fidb serve-reverse-proxy <directory> --port 443 \
  --tls-cert /etc/letsencrypt/live/fidb.app/fullchain.pem \
  --tls-key /etc/letsencrypt/live/fidb.app/privkey.pem

reverse-proxy served at:

  https://127.0.0.1
```

[reverse-proxy] support login
[reverse-proxy] `handleReverseProxyTarget` -- `POST` -- check `password`
[reverse-proxy] user has subdomains
[reverse-proxy] `fidb serve` take `--reverse-proxy-subdomain`

[reverse-proxy] encrypt tcp message by token

[reverse-proxy] `fidb serve` -- ping the socket to keep it alive

- try to restart on `proxySocket` close
- learn from ZMQ

# rest

[rest] rate limit by ip -- for `password-sign-up`

[config] be able to config `rateLimits: { ... }`

# authentication by email -- for any directory

[db] signUpEmail(directory, options): Promise<void>
[db] signInEmail(directory, options): Promise<Token>

[rest] `handleEmail` -- kind=email-sign-up
[rest] `handleEmail` -- kind=email-sign-in

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
