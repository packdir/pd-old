import {Command, Flags} from '@oclif/core'
import * as path from 'path'
import { readFileSync, existsSync } from 'fs'
import * as os from 'os'
import * as fs from 'fs-extra'
import { PACKDIR_ACCESS_TOKEN } from '../../utils/constants'
import axios from 'axios'

export default class Cp extends Command {
  static description = 'Copy files.'

  static flags = {
    target: Flags.string({char: 't', description: 'Target path.'}),
  }

  // Allow multiple arguments to upload files.
  static strict = false

  static args = [{name: 'person', description: 'Person to say hello to', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Cp)

    //console.log('flags: ', flags)
    let targetPath = ''
    if (flags.hasOwnProperty('target')) {
      targetPath = flags.target as string
    }

    // access_token file.
    const tokenfile = path.join(os.homedir(), '.packdir', 'token')
    if (!existsSync(tokenfile)) {
      this.log('You are not logged in.')
      return
    }

    // out directory.
    const outdir = path.join(os.homedir(), '.packdir', 'out')
    fs.ensureDirSync(outdir)
    if (!existsSync(outdir)) {
      this.log('Error in creating out directory!')
      return
    }

    const token = readFileSync(tokenfile, 'utf8')
    if (token && token.length > 10) {
      try {
        const location = 'tmp'
        const urlAccessToken = `${PACKDIR_ACCESS_TOKEN}?location=${location}`
        const response = await axios.get(urlAccessToken, {headers: {'Authorization': `Bearer ${token}`}})
        //console.log('a tok: ', response.data.access_token)

      } catch (error) {
        //fs.removeSync(tokenfile)
        console.log('Failed to upload.', error)
      }
      return
    }
    console.log('You are NOT logged in.')
  }
}
