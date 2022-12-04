import {Command, Flags} from '@oclif/core'
import * as os from 'os'
import * as path from 'path'
import { existsSync } from 'fs'
import * as fs from 'fs-extra'

export default class Logout extends Command {
  static description = 'Logout'

  public async run(): Promise<void> {
    const tokenfile = path.join(os.homedir(), '.packdir', 'token')
    if (existsSync(tokenfile)) {
      fs.removeSync(tokenfile)
      console.log('Logout successfully!')
    } else {
      console.log('You are not logged in.')
    }
  }
}
