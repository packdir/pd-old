import {Command, Flags} from '@oclif/core'
import axios from 'axios'
import * as path from 'path'
import { existsSync, readFileSync } from 'fs'
import * as fs from 'fs-extra'
import * as os from 'os'

export default class Whoami extends Command {
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
    const tokenfile = path.join(os.homedir(), '.packdir', 'token')
    if (existsSync(tokenfile)) {
      const url = 'https://packdir.com/api/v1/whoami'
      const token = readFileSync(tokenfile, 'utf8')
      if (token && token.length > 10) {
        try {
          const response = await axios.get(url, {headers: {'Authorization': `Bearer ${token}`}})
          console.log(response.data.email)
          return
        } catch (error) {
          fs.removeSync(tokenfile)
          //console.log(error)
          //console.log('You are not logged in.')
        }
      }
    }
    console.log('You are NOT logged in.')
  }
}
