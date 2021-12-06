yjson
=====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/yjson.svg)](https://npmjs.org/package/yjson)
[![Downloads/week](https://img.shields.io/npm/dw/yjson.svg)](https://npmjs.org/package/yjson)
[![License](https://img.shields.io/npm/l/yjson.svg)](https://github.com/tupe12334/yjson/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @tupe12334/yjson
$ yjson COMMAND
running command...
$ yjson (-v|--version|version)
@tupe12334/yjson/0.0.1 darwin-x64 node-v14.18.0
$ yjson --help [COMMAND]
USAGE
  $ yjson COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`yjson hello [FILE]`](#yjson-hello-file)
* [`yjson help [COMMAND]`](#yjson-help-command)
* [`yjson init`](#yjson-init)

## `yjson hello [FILE]`

describe the command here

```
USAGE
  $ yjson hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ yjson hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/tupe12334/yjson/blob/v0.0.1/src/commands/hello.ts)_

## `yjson help [COMMAND]`

display help for yjson

```
USAGE
  $ yjson help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.12/src/commands/help.ts)_

## `yjson init`

init a y.json file in a repository

```
USAGE
  $ yjson init

EXAMPLE
  $ yjson init
```

_See code: [src/commands/init.ts](https://github.com/tupe12334/yjson/blob/v0.0.1/src/commands/init.ts)_
<!-- commandsstop -->
