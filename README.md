Packdir cli (pd)
=================

Command line tool to manage files and generate epub books for markdown files.


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g packdir-cli
$ pd COMMAND
running command...
$ pd (--version)
packdir-cli/0.1.3 linux-x64 node-v14.15.1
$ pd --help [COMMAND]
USAGE
  $ pd COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pd gen [FILE]`](#pd-gen-file)
* [`pd hello PERSON`](#pd-hello-person)
* [`pd hello world`](#pd-hello-world)
* [`pd help [COMMAND]`](#pd-help-command)
* [`pd init [FILE]`](#pd-init-file)
* [`pd list [FILE]`](#pd-list-file)
* [`pd open FILENAME`](#pd-open-filename)
* [`pd plugins`](#pd-plugins)
* [`pd plugins:inspect PLUGIN...`](#pd-pluginsinspect-plugin)
* [`pd plugins:install PLUGIN...`](#pd-pluginsinstall-plugin)
* [`pd plugins:link PLUGIN`](#pd-pluginslink-plugin)
* [`pd plugins:uninstall PLUGIN...`](#pd-pluginsuninstall-plugin)
* [`pd plugins update`](#pd-plugins-update)

## `pd gen [FILE]`

Create an EPUB book.

```
USAGE
  $ pd gen [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Create an EPUB book.

EXAMPLES
  $ pd gen
```

_See code: [dist/commands/gen.ts](https://github.com/packdir/pd/blob/v0.1.3/dist/commands/gen.ts)_

## `pd hello PERSON`

Say hello

```
USAGE
  $ pd hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/packdir/pd/blob/v0.1.3/dist/commands/hello/index.ts)_

## `pd hello world`

Say hello world

```
USAGE
  $ pd hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `pd help [COMMAND]`

Display help for pd.

```
USAGE
  $ pd help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for pd.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `pd init [FILE]`

Init to create packdir.json

```
USAGE
  $ pd init [FILE] [-y]

FLAGS
  -y, --yes

DESCRIPTION
  Init to create packdir.json

EXAMPLES
  $ pd init
```

_See code: [dist/commands/init.ts](https://github.com/packdir/pd/blob/v0.1.3/dist/commands/init.ts)_

## `pd list [FILE]`

List all ebooks.

```
USAGE
  $ pd list [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  List all ebooks.

EXAMPLES
  $ pd list
```

_See code: [dist/commands/list.ts](https://github.com/packdir/pd/blob/v0.1.3/dist/commands/list.ts)_

## `pd open FILENAME`

Open an file with default application.

```
USAGE
  $ pd open [FILENAME] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Open an file with default application.

EXAMPLES
  $ pd open
```

_See code: [dist/commands/open.ts](https://github.com/packdir/pd/blob/v0.1.3/dist/commands/open.ts)_


<!-- commandsstop -->
