/**
 * Create a PD document.
 */

import { writeFile } from 'fs/promises'
import { Command, Flags } from '@oclif/core'
import { Packdocument } from '../packDocument'

// Test book:
import { contentAlice, optionsAlice } from '../aliceData'
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
    this.log(`hello ${name} from /mnt/d/Henry/packdir/pd/src/commands/create.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }

    // Test epub.
    //const metadata = {
    //  title: "custome title OKOK2w"
    //}
    //const epub2 = new Packdocument(metadata)
    //epub2.saveAsEpub()

    // Generate from markdown files in current path.
    const [docTitle, mdcontent] = await Packdocument.generateFromPath()
    console.log('cntent::', mdcontent)
    const contentmd: Chapter[] = [
      {
        title: docTitle,
        content: mdcontent
      }
    ]

    // Alice
    //const content = await epub(optionsAlice, contentAlice)
    const content = await epub(optionsAlice, contentmd)
    await writeFile(`${docTitle}.epub`, Buffer.from(content))
    console.log('Alice: finised')
  }
}
