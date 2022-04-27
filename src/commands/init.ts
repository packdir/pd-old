/**
 * Init to create packdir.json
 */

import { Command, Flags } from '@oclif/core'
import fs from 'fs'
import { stat, mkdir, writeFile, readdir } from 'fs/promises'
import path from 'path'
import inquirer from 'inquirer'
//import { from, Observable, Observer } from 'rxjs'
//import * as Rx from 'rxjs'

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

  //static examples = [
  //  '<%= config.bin %> <%= command.id %>',
  //]

  //static flags = {
  //  yes: Flags.boolean({char: 'y'}),
  //}

  //static args = [{name: 'file'}]

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

    /*
    let emitter
    let prompts = new Observable((observer: Observer<any>) => {
      emitter = observer
      emitter.next(questions)
      emitter.complete()
    })

    inquirer.prompt(prompts).ui.process.subscribe({
    })
    */

    inquirer
      .prompt(questions)
      .then( async (answers) => {
        const config = this.generateConfig(answers)
        await writeFile('pd.json', config)
        console.log('Created packdir.json successfully!')
      })
      .catch((err) => {
        console.log('Error: ', err)
      })

    // Create packdir directory
    stat('packdir').catch(async (err) => {
      if (err.code === 'ENOENT') { // Directory packdir is not existing
        await mkdir('packdir', { recursive: true })
      }
    })
  }

  /**
   * Get questions for init.
   *
   * @returns Questions for init.
   */
  private async initQuestions() {
    const currentPathname = path.basename(process.cwd())

    // Markdown list
    let markdownFiles: fileInQuestion[] = []
    // Image list
    let imageFiles: fileInQuestion[] = []

    // Markdown files
    const p = process.cwd()
    await this.getMarkdownFilesInDirectory(p, markdownFiles)

    // Possible cover.
    const files = await readdir('./')
    files.forEach((filename) => {
      const ext = path.extname(filename).toLowerCase()
      if ('.jpg' === ext || '.png' === ext) {
        imageFiles.push({
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
      },
    ]

    // Choose cover image.
    if (imageFiles.length > 0) {
      imageFiles.push({
        name: '[none]',
        checked: true,
        value: 'none'
      })

      questions.push({
        type: 'list',
        name: 'doc_cover',
        message: 'Choose the cover image:',
        pageSize: 25,
        choices: imageFiles
      })
    }

    return questions
  }

  private generateConfig(answers: any) {
    let articles: string[] = []
    answers.doc_articles.forEach((filename: string) => {
      articles.push(filename)
    })

    let urlcover = ''
    if (answers.doc_cover && answers.doc_cover.length > 0 && answers.doc_cover !== 'none') {
      const pathname = path.resolve(answers.doc_cover)
      if (pathname) {
        urlcover = `file://${pathname}`
      }
    }

    const config = {
      "documentName": answers.doc_name,
      "author": answers.author,
      "cover": urlcover,
      "content": articles
    }

    return JSON.stringify(config, null, 2)
  }

  /**
   * Read a directory to find markdown files.
   *
   * @param dir Directory to check
   */
  private async getMarkdownFilesInDirectory(dir: string,
                                            markdownFiles: fileInQuestion[],
                                            pathPrefix = '',
                                            layer = 0) {
    console.log('dir: ', dir)
    const files = await readdir(dir)
    files.forEach(async (filename) => {
      const p = path.join(dir, filename)
      if (fs.lstatSync(p).isDirectory()) {
        if (layer < 1) {
          const new_prefix = (pathPrefix ? `${pathPrefix}/` : '') + filename
          await this.getMarkdownFilesInDirectory(p, markdownFiles, new_prefix, layer + 1)
        }
      } else {
        const ext = path.extname(filename).toLowerCase()
        if ('.md' === ext) {
          const name = (pathPrefix ? `${pathPrefix}/` : '') + filename
          markdownFiles.push({
            name,
            checked: true,
            value: name
          })
        }
      }
    })
    return markdownFiles
  }
}
