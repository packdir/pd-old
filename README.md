Packdir cli (pd)
=================

Command line tool to generate epub books for markdown files.

[![packdir.com](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://packdir.com)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/packdir-cli)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

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
packdir-cli/0.0.2 linux-x64 node-v14.15.1
$ pd --help [COMMAND]
USAGE
  $ pd COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pd create [FILE]`](#pd-create-file)
* [`pd hello PERSON`](#pd-hello-person)
* [`pd hello world`](#pd-hello-world)
* [`pd help [COMMAND]`](#pd-help-command)
* [`pd init [FILE]`](#pd-init-file)
* [`pd list [FILE]`](#pd-list-file)
* [`pd plugins`](#pd-plugins)
* [`pd plugins:inspect PLUGIN...`](#pd-pluginsinspect-plugin)
* [`pd plugins:install PLUGIN...`](#pd-pluginsinstall-plugin)
* [`pd plugins:link PLUGIN`](#pd-pluginslink-plugin)
* [`pd plugins:uninstall PLUGIN...`](#pd-pluginsuninstall-plugin)
* [`pd plugins update`](#pd-plugins-update)

## `pd create [FILE]`

Create a document.

```
USAGE
  $ pd create [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Create a document.

EXAMPLES
  $ pd create
```

_See code: [dist/commands/create.ts](https://github.com/packdir/pd/blob/v0.0.2/dist/commands/create.ts)_

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

_See code: [dist/commands/hello/index.ts](https://github.com/packdir/pd/blob/v0.0.2/dist/commands/hello/index.ts)_

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

_See code: [dist/commands/init.ts](https://github.com/packdir/pd/blob/v0.0.2/dist/commands/init.ts)_

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

_See code: [dist/commands/list.ts](https://github.com/packdir/pd/blob/v0.0.2/dist/commands/list.ts)_

## `pd plugins`

List installed plugins.

```
USAGE
  $ pd plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ pd plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `pd plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ pd plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ pd plugins:inspect myplugin
```

## `pd plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ pd plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ pd plugins add

EXAMPLES
  $ pd plugins:install myplugin 

  $ pd plugins:install https://github.com/someuser/someplugin

  $ pd plugins:install someuser/someplugin
```

## `pd plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ pd plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ pd plugins:link myplugin
```

## `pd plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pd plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pd plugins unlink
  $ pd plugins remove
```

## `pd plugins update`

Update installed plugins.

```
USAGE
  $ pd plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
