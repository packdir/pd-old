/**
 * Create a PD document.
 */

import {Command, Flags} from '@oclif/core'
import {Packdocument} from '../packDocument'

export default class Create extends Command {
  static description = 'Create a document.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Create)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /mnt/d/Henry/packdir/pd/src/commands/create.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }

    // Test epub.
    const metadata = {
      title: "custome title OKOK2w"
    }
    const epub = new Packdocument(metadata)
    epub.saveAsEpub()
  }
}
