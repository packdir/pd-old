/**
 * Init
 */

import {Command, Flags} from '@oclif/core'
import { stat, mkdir } from 'fs/promises'

export default class Init extends Command {
  static description = 'describe the command here'

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
    const {args, flags} = await this.parse(Init)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /mnt/d/Henry/packdir/pd/src/commands/init.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }

    // Create .packdir directory
    stat('.packdir').catch(async (err) => {
      if (err.code === 'ENOENT') { // Directory .packdir is not existing
        console.log('.packdir not found')
        await mkdir('.packdir/epubs', { recursive: true })
      }
    })
  }
}
