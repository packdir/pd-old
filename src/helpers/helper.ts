import { createReadStream, statSync } from 'fs'
//import { Stream } from 'stream'
import * as crypto from 'crypto'
//const crypto = require('crypto');

export class Helper {
  static description = 'The Helper class.'
  readonly access_token: string = ''
  readonly chunk_size = 1024 * 1024 * 4

  constructor (token?: string) {
    this.access_token = token || ''
  }

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

  generateChunkFiles(i: number, pathname: string): Promise<string|Buffer> {
    return new Promise((res) => {
        //let data: string | Buffer
        let data: any
        let data2: string | Buffer
        //let data: Buffer
        let start = i * this.chunk_size
        let end = (i + 1) * this.chunk_size - 1
        const stream = createReadStream(pathname, {
            start,
            end
        })

        stream.on('data', (chunk) => {
            if (!data) {
                data = chunk
            } else {
              console.log('Error 1001')
              data = Buffer.concat([data, chunk])
            }
        });
        stream.on('end', () => {
            res(data)
        });
    })
  }

  async splitFile(pathname: string): Promise<string[]> {
    return new Promise(async (res) => {
      const totalNum = Math.ceil(statSync(pathname).size / this.chunk_size)
      console.log('totalNum: ', totalNum)
      for (let i = 0; i < totalNum; i++) {
        //const data = await this.generateChunkFiles(i, pathname)
        const data = await this.stream2buffer(i, pathname)
        console.log('i: ', i)
        console.log('data: ', data)
      }
    })

  /*
    promistlist = []
    // fs.createReadStream
    for (let i = 0; i < info.num; i++) {
        let data = await getfile({ url, i })
        const hash = crypto.createHash('md5'); // 创建一个md5加密的hash
        hash.update(data); // 更新内容
        const md5 = hash.digest('hex'); // 返回计算内容
        console.log(md5);
        promistlist.push(md5)
    }
    return promistlist
    */
  }

}
