import { createReadStream, createWriteStream, statSync, existsSync } from 'fs'
import * as path from 'path'
import * as md5File from 'md5-file'
//import { Stream } from 'stream'
//import * as crypto from 'crypto'
//const crypto = require('crypto');

export class Helper {
  static description = 'The Helper class.'
  readonly access_token: string = ''
  readonly outdir: string = ''
  readonly chunk_size = 1024 * 1024 * 4
  //readonly chunk_size = 4
  md5list: string[] = []
  chunks: any = []

  constructor (token?: string, outdir?: string) {
    this.access_token = token || ''
    this.outdir = outdir || ''
  }

  async generateChunk(i: number, pathname: string, chunkPathname: string, is_last: boolean ): Promise<void> {
    return new Promise<void> ((resolve, reject) => {
      let start = i * this.chunk_size
      let end = (i + 1) * this.chunk_size - 1
      if (is_last) {
        console.log('is last')
        const total = statSync(pathname).size
        end = start + (total - i * this.chunk_size - 1)
      }
      //const stream = is_last ? createReadStream(pathname, { encoding: null as any, start }) : createReadStream(pathname, {
      //  encoding: null as any,
      //  start,
      //  end
      //})
      /*
      const stream = createReadStream(pathname, {
        encoding: 'binary',
      })
      */
      const stream = createReadStream(pathname, {
        encoding: null as any,
        start,
        end
      })
      const out = createWriteStream(chunkPathname)
      const pipe = stream.pipe(out)
      pipe.on("error", err => reject(`error generating chunk - ${err}`))
      pipe.on("finish", () => resolve())
    })
  }

  /**
   * 废弃这种方式：因为文件过大时，会导致内存溢出。
   * @param i 
   * @param pathname 
   * @returns 
  async stream2buffer(i: number, pathname: string): Promise<Buffer> {
    return new Promise<Buffer> ((resolve, reject) => {
      const _buf = Array<any>()

      let start = i * this.chunk_size
      let end = (i + 1) * this.chunk_size - 1
      const stream = createReadStream(pathname, {
        start,
        end
      })

      stream.on("data", chunk => _buf.push(chunk))
      stream.on("end", () => resolve(Buffer.concat(_buf)))
      stream.on("error", err => reject(`error converting stream - ${err}`))
    })
  } 
   */

  /**
   * 生成文件块的文件名
   */
  filenameIncrement(i: number, stamp: number): number {
    const filename = path.join(this.outdir, `chunk.${stamp}.${i}`)
    if (existsSync(filename)) {
      return this.filenameIncrement(i + 1, stamp)
    } else {
      return i
    }
  }

  async splitFile(pathname: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const totalNum = Math.ceil(statSync(pathname).size / this.chunk_size)

      // Files.
      const _chunks = []

      // To generate the file name of each chunk
      let p = 0
      const stamp = Date.now()

      for (let i = 0; i < totalNum; i++) {
        try {
          p = this.filenameIncrement(p, stamp)
          const chunkFilename = `chunk.${stamp}.${p}`
          const chunkPathname = path.join(this.outdir, chunkFilename)
          await this.generateChunk(i, pathname, chunkPathname, i == (totalNum - 1))
          const md5 = md5File.sync(chunkPathname)

          _chunks.push({
            filename: chunkFilename,
            pathname: chunkPathname,
            md5
          })
          p++

          this.md5list.push(md5)

          /*
          const data = await this.stream2buffer(i, pathname)
          if (data) {
            p = this.filenameIncrement(p, stamp)
            const chunkPathname = path.join(this.outdir, `chunk.${stamp}.${p}`)
            createWriteStream(chunkPathname).write(data)

            _chunks.push(chunkPathname)
            p++
          }
          */
        } catch (error) {
          console.log('error: ', error)
        }
      }

      this.chunks = _chunks

      resolve(_chunks)
    })
  }

}
