/**
 * Upload
 * 
 * Upload local files to a cloud storage.
 * 
 * Steps:
 * 1. Get access_token from packdir.com.
 * 2. Upload local files to a cloud storage.
 */

import {Command, Flags} from '@oclif/core'
import axios from 'axios'
import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs-extra'
import { existsSync, readFileSync } from 'fs'
import { PACKDIR_ACCESS_TOKEN, PACKDIR_UPLOAD } from '../utils/constants'

export default class Upload extends Command {
  static description = 'Upload local files to a cloud storage.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-t, --target=VALUE)
    // - baidu //Baidunetdisk 百度网盘
    // - onedrive //OneDrive
    // - googledrive //Google Drive
    target: Flags.string({char: 't', description: 'Target cloud storage'}),
  }

  // Allow multiple arguments to upload files.
  static strict = false

  public async run(): Promise<void> {
    const {args, flags, argv} = await this.parse(Upload)
    this.log('args:: ', args, 'flags:: ', flags)
    this.log('argvvvv: ', argv)
    this.log('flags.name: ', flags.name)

    // 1. Get access_token from packdir.com.
    const tokenfile = path.join(os.homedir(), '.packdir', 'token')
    if (!existsSync(tokenfile)) {
      this.log('You are not logged in.')
      return
    }

    const token = readFileSync(tokenfile, 'utf8')
    console.log('-----token:')
    console.log(token)
    console.log('end-----token:')
    if (token && token.length > 10) {
      try {
        const location = 'tmp'
        const urlAccessToken = `${PACKDIR_ACCESS_TOKEN}?location=${location}`
        const response = await axios.get(urlAccessToken, {headers: {'Authorization': `Bearer ${token}`}})
        console.log('a tok: ', response.data.access_token)

        // 2. Upload local files to a cloud storage.
        argv.forEach(async (file) => {
          console.log('dd:10:', PACKDIR_UPLOAD)
          const result = await axios.post(
            PACKDIR_UPLOAD,
            {
              target: flags.target,
              file: 'file',
            },
            {
              headers: {
                'Authorization': 'Bearer ' + response.data.access_token,
              },
            }
          )
          console.log('b tok: ', result.data.access_token)
        })
      } catch (error) {
        //fs.removeSync(tokenfile)
        console.log('Failed to upload.', error)
      }
      return
    }
    console.log('You are not logged in.')
  }
}
