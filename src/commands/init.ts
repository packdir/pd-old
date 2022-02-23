/**
 * Init to create packdir.json
 */

import { Command, Flags } from '@oclif/core'
import { stat, mkdir, writeFile, readdir } from 'fs/promises'
import { basename } from 'path'
import inquirer from 'inquirer'

/**
 * Interface for the status of files in init qestions.
 */
interface fileInQuestion {
  name: string,
  checked: boolean,
  value: string
}

export default class Init extends Command {
  static description = 'Init to create packdir.json'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
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

    const questions = await this.initQuestions()

    inquirer
      .prompt(questions)
      .then( async (answers) => {
        const config = this.generateConfig(answers)
        await writeFile('packdir.json', config)
        console.log('Create packdir.json successfully!')
      })
      .catch((err) => {
        console.log('Error: ', err)
      })

    // Create .packdir directory
    //stat('.packdir').catch(async (err) => {
    //  if (err.code === 'ENOENT') { // Directory .packdir is not existing
    //    await mkdir('.packdir/epubs', { recursive: true })
    //  }
    //})
  }

  /**
   * Get questions for init.
   *
   * @returns Questions for init.
   */
  private async initQuestions() {
    const currentPathname = basename(process.cwd())

    const files = await readdir('./')
    let markdownFiles: fileInQuestion[] = []
    files.forEach((filename) => {
      if ('.md' === filename.substring(filename.length - 3).toLowerCase()) {
        markdownFiles.push({
          name: filename,
          checked: true,
          value: filename
        })
      }
    })

    let questions = [
      {
        type: 'input',
        name: 'doc_name',
        message: 'Document name:',
        default: currentPathname
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: ''
      },
      {
        type: 'checkbox',
        name: 'doc_articles',
        message: 'What files do you want to include?',
        pageSize: 25,
        choices: markdownFiles
      }
    ]
    return questions
  }

  private generateConfig(answers: any) {
    let articles: string[] = []
    answers.doc_articles.forEach((filename: string) => {
      articles.push(filename)
    })

    const config = {
      "documentName": answers.doc_name,
      "author": answers.author,
      "content": articles
    }

    return JSON.stringify(config, null, 2)
  }
}
