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
import { BaiduHelper } from '../helpers/baidu'
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

    // target path: relative path.
    target: Flags.string({char: 't', description: 'Target cloud storage'}),
  }

  // Allow multiple arguments to upload files.
  static strict = false

  public async run(): Promise<void> {
    const {args, flags, argv} = await this.parse(Upload)

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

        // Upload local files to a cloud storage.
        argv.forEach(async (file) => {
          //console.log('上传文件name：', file)
          if (!existsSync(file)) {
            console.log(`File '${file}' does not exist.`)
            return
          }
          //console.log('文件存在dd:10:', PACKDIR_UPLOAD)

          try {
            const baiduHelper = new BaiduHelper(response.data.access_token, outdir, targetPath)
            await baiduHelper.splitFile(file)
            baiduHelper.upload(file)
          } catch (error) {
            console.log('Failed to upload.', error)
          }
        })
      } catch (error) {
        //fs.removeSync(tokenfile)
        console.log('Failed to upload.', error)
      }
      return
    }
    console.log('You are NOT logged in.')
  }
}
