/**
 * Init
 */

import { Command, Flags } from '@oclif/core'
import { stat, mkdir } from 'fs/promises'
import inquirer from 'inquirer'

export default class Init extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with no value (-y, --yes)
    yes: Flags.boolean({char: 'y'}),
  }

  static args = [{name: 'file'}]

  public async run(): Promise<void> {
    this.log('This utility will walk you through creating a packdir.json file.')
    this.log('It only covers the most common items, and tries to guess sensible defaults.')
    this.log('')
    this.log('See `pd help init` for definitive documentation on these fields')
    this.log('and exactly what they do.')
    this.log('')
    this.log('Press ^C at any time to quit.')

    const {args, flags} = await this.parse(Init)

    if (flags.yes) {
      this.log(`you input --yes:`)
    }

    const questions = [
      {
        type: 'input',
        name: 'doc_name',
        message: 'Document(epub) name: (packdir)',
        default: 'packdir'
      }
    ]

    inquirer
      .prompt(questions)
      .then((answers) => {
        console.log('your answers: ', answers)
      })
      .catch((err) => {
        console.log('Error: ', err)
      })

    // Create .packdir directory
    stat('.packdir').catch(async (err) => {
      if (err.code === 'ENOENT') { // Directory .packdir is not existing
        await mkdir('.packdir/epubs', { recursive: true })
      }
    })
  }
}
