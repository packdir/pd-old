Packdir cli (pd)
=================

A command line tool to manage your files and generate epub books from markdown files.

Features:

- Specify the files that you intent to manage.
- Generate EPUB books from markdown files.
- Manage your files located in different location in command line.


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @packdir/cli
$ pd COMMAND
running command...
$ pd (--version)
@packdir/cli/0.1.6 linux-x64 node-v14.15.1
$ pd --help [COMMAND]
USAGE
  $ pd COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pd gen [FILE]`](#pd-gen-file)
* [`pd help [COMMAND]`](#pd-help-command)
* [`pd init [FILE]`](#pd-init-file)
* [`pd list [FILE]`](#pd-list-file)
* [`pd open FILENAME`](#pd-open-filename)

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

_See code: [dist/commands/gen.ts](https://github.com/packdir/pd/blob/v0.1.6/dist/commands/gen.ts)_


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

_See code: [dist/commands/init.ts](https://github.com/packdir/pd/blob/v0.1.6/dist/commands/init.ts)_



## `pd open FILENAME`

Open a file with the default application.

```
USAGE
  $ pd open [FILENAME]

DESCRIPTION
  Open a file with the default application.

EXAMPLES
  $ pd open
```

_See code: [dist/commands/open.ts](https://github.com/packdir/pd/blob/v0.1.6/dist/commands/open.ts)_

<!-- commandsstop -->
