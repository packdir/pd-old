import { Helper } from './helper'
import axios from 'axios'
import * as fs from 'fs-extra'
import { open, read, statSync, createReadStream, readFileSync } from 'fs'
import { trimSlash } from '../utils/pdtools'
import { BAIDU_TARGET_ROOT } from '../utils/constants'
//import * as md5File from 'md5-file'
//import { Curl } from 'node-libcurl'
import * as FormData from 'form-data'
//const FormData = require('form-data')

const exec = require('child_process').exec

export class BaiduHelper extends Helper {

  // 目标路径
  targetRoot = BAIDU_TARGET_ROOT

  constructor (token?: string, outdir?: string, target?: string) {
    super(token, outdir)

    // 目标路径
    // Note:
    // 1. 上传的时候，会自动创建目录，所以这里不需要创建目录。
    // 2. 文件路径不需要urlencode，虽然官方文档说需要urlencode，但是实际测试发现不需要。！！！
    if (target && target.length > 0) {
      this.targetRoot += trimSlash(target) + '/'
    }
  }

	public show_access_token(): string {
		//console.log('acc tok: ', this.access_token)
		return this.access_token
	}

	public async upload(pathname: string): Promise<void> {
		const stats = statSync(pathname)
		const fileSizeInBytes = stats.size

		//const md5 = md5File.sync(pathname)

		const filename = pathname.split('/').pop()

    const form2 = new FormData();
    //const pathEncoded = encodeURI(this.targetRoot + filename)
    const pathEncoded = (this.targetRoot + filename)
    form2.append('path', pathEncoded);
    form2.append('size', fileSizeInBytes);
    form2.append('isdir', 0);
    //form2.append('block_list', '["' + md5 + '"]');
    form2.append('block_list', JSON.stringify(this.md5list));
    form2.append('autoinit', 1);

		const url = 'https://pan.baidu.com/rest/2.0/xpan/file?method=precreate&access_token=' + this.access_token

		this.precreate(form2, url, pathEncoded, fileSizeInBytes)
	}

	private async precreate(args: any, url: string, pathEncoded: string, fileSizeInBytes: number): Promise<void> {
		//// 1. Get access_token from packdir.com.
		//const tokenfile = path.join(os.homedir(), '.packdir',	'token')
		//if (!existsSync(tokenfile)) {
		//	this.log('You are not logged in.')
		//	return
		//}
    const result = await axios.post(
      url,
      args,
      {
                //'maxBodyLength': Infinity,
        		//'maxContentLength': Infinity,
        headers: {
          "User-Agent": "pan.baidu.com"
        },
        //params: {
        //  "method": 'precreate',
        //  "access_token": this.access_token,
        //},
      }
    )

    this.uploadChunks(result.data.uploadid, pathEncoded, fileSizeInBytes)
  }

  // 分片上传
  private async uploadFile(chunk: any, index: number, uploadid: string, pathEncoded: string, fileSizeInBytes: number): Promise<any> {
    const that = this
    return new Promise( async (resolve, reject) => {
      const url = `https://d.pcs.baidu.com/rest/2.0/pcs/superfile2?access_token=${that.access_token}&method=upload&type=tmpfile&path=${pathEncoded}&uploadid=${uploadid}&partseq=${index}`

      /*
      const fcontent = readFileSync(chunk.pathname)
      const form = new FormData()
      form.append('file', fcontent, chunk.filename)

		  const stats = statSync(chunk.pathname)
      const fileSizeInBytes = stats.size //+ 50

      // 文档写的是POST，但是实际上是PUT！！！
      const result = await axios.put(
        url,
        form,
        {
          headers: {
            'Content-Length': fileSizeInBytes,
            //'Content-Length': form.getLengthSync(),
            ...form.getHeaders(),
          },
        }
      )

      resolve(result.data)
      */



      /*
		  const stats = statSync(chunk.pathname)
      const fileSizeInBytes = stats.size //+ 50

      const file = await createReadStream(chunk.pathname);
      const form = new FormData();
      form.append('file', file);

      console.log('000000000000000000000000')
      console.log('headers: ', form.getHeaders())
      console.log('000000000000000000000000')
      const result = await axios.put(
        url,
        form,
        {
          headers: {
            'Content-Length': fileSizeInBytes,
            //'Content-Length': form.getLengthSync(),
            ...form.getHeaders(),
          },
        }
      )

      resolve(result.data)
      */


      /*
      const curl = new Curl();
      const close = curl.close.bind(curl);

      curl.setOpt(Curl.option.URL, url);
      curl.setOpt(Curl.option.HTTPPOST, [
        { name: 'file', file: chunk.pathname, type: 'text/html' },
      ]);

      curl.on('end', () => {
        close
        resolve(true)
      });
      curl.on('error', close);

      curl.perform();
      */

      exec(`curl -F 'file=@${chunk.pathname}' "${url}"`, (err: any, stdout: any, stderr: any) => {
        if (err) {
          reject(err)
          return
        }

        resolve(stdout)
      })


      /*
      open(chunk.pathname, 'r', (err, fd) => {
        if (err) {
          reject(err)
          return
        }

        let buffer = Buffer.alloc(fileSizeInBytes)
        read(fd, buffer, 0, fileSizeInBytes, 0, async (err, num) => {
          if (err) {
            reject(err)
            return
          }

          console.log('||||: ', typeof buffer)
          console.log('||||:length: ', buffer.length)
          console.log('||||:0: ', buffer[0])
          console.log('||||:1: ', buffer[1])
          console.log('||||:2: ', buffer[2])
          let k = ''
          for (let j = 0; j < buffer.length; j++) {
            //k.push(buffer[j])
            k += buffer[j]
          }


          const form = new FormData()
          //form.append('file', buffer.toString(), chunk.filename)
          form.append('file', k, chunk.filename)
          const result = await axios.put(
            url,
            form,
            {
              headers: {
                'Content-Length': fileSizeInBytes,
                //'Content-Length': form.getLengthSync(),
                ...form.getHeaders(),
              },
            }
          )

          resolve(result.data)
        })
      })
      */

    })
  }

  private async uploadChunks(uploadid: string, pathEncoded: string, fileSizeInBytes: number): Promise<void> {
    const that = this

    return new Promise( async (resolve, reject) => {

      try {
        const newMD5list: string[] = []
        const promises: Promise<any>[] = []

        for (let i = 0; i < this.chunks.length; i++) {
          console.log(`Uploading...('${i+1}/${this.chunks.length}`)
          const chunk = this.chunks[i]
          const result = await this.uploadFile(chunk, i, uploadid, pathEncoded, fileSizeInBytes)
          const k = JSON.parse(result)
          //newMD5list.push(result.md5)
          newMD5list.push(k.md5)
          promises.push(result)
        }

        Promise.all(promises).then(async(results) => {
          // 上传完成，合成文件
          let s = new FormData()
          s.append('path', pathEncoded)
          s.append('size', fileSizeInBytes)
          s.append('isdir', 0)
          s.append('rtype', 1)
          s.append('uploadid', uploadid)
          s.append('block_list', JSON.stringify(newMD5list))

          //console.log('path: ', pathEncoded)
          //console.log('size: ', fileSizeInBytes)
          //console.log('isdir: ', 0)
          //console.log('rtype: ', 1)
          //console.log('uploadid: ', uploadid)
          //console.log('block_list: ', JSON.stringify(newMD5list))

          await axios.post('https://pan.baidu.com/rest/2.0/xpan/file?method=create', s, {
              headers: {
                "User-Agent": "pan.baidu.com"
              },
              params:{
                  access_token: that.access_token,
              }
          }).then((res)=>{
              //console.log(res.data)
              console.log(`Uploaded successfully! (${pathEncoded})`)
          })
        })
      } catch (err) {
        console.log('上传失败: ', err)
      }
    })
  }
}
