# FiDB

This is a Node.js implementation of [**FiDB**](https://fidb.app)
-- a suite of protocols to use file system as database.


Including some API functions to handle data files.

```js
import { Db } from "fidb"

Db.dataCreate(db: Database, path: string, input: JsonObject): Promise<Data>
Db.dataGetOrFail(db: Database, path: string): Promise<Data>
Db.dataGet(db: Database, path: string): Promise<Data | undefined>
Db.dataPut(db: Database, path: string, input: JsonObject): Promise<Data>
Db.dataPatch(db: Database, path: string, input: JsonObject): Promise<Data>
Db.dataDelete(db: Database, path: string, input: JsonObject): Promise<void>
...
```

A command-line tool to initialize and maintain database.

```
fidb help [name]   Display help for a command
fidb init [path]   Initialize a directory to be a database
fidb serve [path]  Serve a database
```

And a HTTP server to generate REST API from a database.

```sh
POST   {data-path}?kind=data
GET    {data-path}?kind=data
PUT    {data-path}?kind=data
PATCH  {data-path}?kind=data
DELETE {data-path}?kind=data

GET    {data-directory}?kind=data-find

POST   {file}?kind=file
GET    {file}?kind=file
PUT    {flie}?kind=file
PATCH  {flie}?kind=file
DELETE {flie}?kind=file

GET    {flie}?kind=file-metadata.

POST   {directory}?kind=directory
GET    {directory}?kind=directory
DELETE {directory}?kind=directory
```

## Ethos

The ethos of the FiDB project is the following "what if ...?"s.

> What if we use file system as database?

> What if we generate HTTP API from the database, <br>
> instead of writing trivial CRUD code over and over again?

> What if we write web apps in a way that a user can switch backend, <br>
> even using their local backend?

## Install

### Requirements

Node.js version must
be >= [20.1](https://nodejs.org/en/blog/release/v20.1.0)
or >= [18.17.0](https://nodejs.org/en/blog/release/v18.17.0).

- For the `recursive` option to `readdir` and `opendir`.

### Command line tool

Install it by the following command:

```sh
npm install -g fidb
```

The command line program is called `fidb`.

## Docs

- [Init a database](#init-a-database)
- [Serve one database](#serve-one-database)
- [Serve many databases](#serve-many-databases)
- [Config logger](#config-logger)
- [Login a user](#login-a-user)
- [Register a user](#register-a-user)
- [Use systemd to start service](#use-systemd-to-start-service)

### Init a database

A database is just a directory of subdirectories and JSON data files,
with a `database.json` config file,
and with some more data files serve as
detailed system configurations.

Use the `fidb init` command to create a database:

```sh
fidb init hello-world
```

Example console output of `fidb init`:

```
13:58:26.119 [init] -- {"directory":"/tmp/hello-world"}
13:58:26.125 [initDatabaseConfigFile] -- {"file":"/tmp/hello-world/database.json"}
13:58:26.133 [initSystemResource] -- {"path":".config/default-token-issuer"}
13:58:26.134 [initSystemResource] -- {"path":".tokens/default"}
13:58:26.135 [initSystemResource] -- {"path":".config/password-register-strategy"}
13:58:26.201 [initExampleUser] -- {"path":"users/alice","password":"alice123"}
13:58:26.251 [initExampleUser] -- {"path":"users/bob","password":"bob456"}
```

Let's run `tree` to see what directories and files are created:

```

❯ tree -a hello-world/
hello-world/
├── .config
│   ├── default-token-issuer
│   │   └── index.json
│   └── password-register-strategy
│       └── index.json
├── database.json
├── .tokens
│   └── default
│       └── index.json
└── users
    ├── alice
    │   ├── index.json
    │   ├── .login
    │   │   └── index.json
    │   └── .password
    │       └── index.json
    └── bob
        ├── index.json
        ├── .login
        │   └── index.json
        └── .password
            └── index.json

13 directories, 10 files
```

## Serve one database

Use the `fidb serve` command to serve a database:

```sh
fidb serve hello-world
```

The default port of the server is `5108`, which looks like FiDB isn't it?

### Config logger

We can config logger in `/databases/database.json`:

```json
{
  ...,
  "logger": {
    "name": "pretty-line",
    "disableRequestLogging": true
  }
}
```

The type of logger options are:

```ts
export type LoggerOptions = {
  name: "json" | "silent" | "pretty" | "pretty-line"
  disableRequestLogging?: boolean
}
```

The default logger options are:

```json
{
  "name": "pretty-line",
  "disableRequestLogging": false
}
```

## Login a user

Use `POST {data-file}?kind=password-login` HTTP request to login an initialized user:

```sh
curl -X POST "http://127.0.0.1:5108/users/alice?kind=password-login" --data-binary @-<< END

{
  "password": "alice123"
}

END
```

The response of a `POST {data-file}?kind=password-login` request
is an access token in JSON string format.

```json
"34dbf6a79e7968ffc3cda1b51c3fada9"
```

Which can be used in the `Authorization` header for future requests.

```
Authorization: token 34dbf6a79e7968ffc3cda1b51c3fada9
```

## Register a user

Use `POST {data-file}?kind=password-register` HTTP request to register a new user:

```sh
curl -X POST "http://127.0.0.1:5108/users/carol?kind=password-register" --data-binary @-<< END

{
  "data": {
    "name": "Carol"
  },
  "options": {
    "memo": "Example `password-register`",
    "password": "carol789"
  }
}

END
```

Example response of `POST {data-file}?kind=password-register` request:

```json
{
  "name": "Carol",
  "@path": "users/carol",
  "@revision": "6bbf9a32c4d0f7964d1fee2aa9491523",
  "@createdAt": 1694757904583,
  "@updatedAt": 1694757904583
}
```

### Use systemd to start service

Install service:

```
sudo cp <name>.service /etc/systemd/system/
```

Using service:

```
sudo systemctl start <name>.service
sudo systemctl enable <name>.service
sudo systemctl status <name>.service
```

To view log:

```
journalctl -f -u <name>.service
```

Reload systemd config files:

```
systemctl daemon-reload
```

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
