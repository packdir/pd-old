/**
 * Create an EPUB.
 */

import { writeFile } from 'fs/promises'
import { Command, Flags } from '@oclif/core'
import { Packdocument } from '../packDocument'
import epub, { Chapter } from '../lib'

export default class Create extends Command {
  static description = 'Create an EPUB book.'

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
    this.log(`hello ${name} from /mnt/d/Henry/packdir/pd/src/commands/gen.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }

    // Test epub.
    //const metadata = {
    //  title: "custome title"
    //}
    //const epub2 = new Packdocument(metadata)
    //epub2.saveAsEpub()

    // Generate from markdown files in current path.
    const [options, mdcontent] = await Packdocument.generateFromPath()
    const contentmd: Chapter[] = mdcontent

    const content = await epub(options, contentmd)
    await writeFile(`${options.title}.epub`, Buffer.from(content))
  }
}
